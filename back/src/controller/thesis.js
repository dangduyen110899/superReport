const db = require('../config/db');
const Thesis = db.thesis;
const Lecturer = db.lecturer;
const Student = db.student;
const { Op } = require("sequelize");

const readXlsxFile = require('read-excel-file/node');
const report = require('./report');
const getHourItem = require('./getHourItem');
const thesis = {}

thesis.list = async (req, res) => {
  const year = req.query.year;
  const semester = req.query.semester;
  let response;

  if (Boolean(year) && Boolean(semester)) {
    response = await Thesis.findAll({
      where: {
        [Op.and]: [
          { year: year },
          { semester: Number(semester) }
        ]
      }
    })
  } else {
    response = await Thesis.findAll()
  }
  res.json(response);

}

// thesis.hehe = async ( req, res) => {
//   try {
//     const response = await Thesis.findAll({
//       group: ['teacherCode'],
//       attributes: ["id", "type","teacherCode", "studentCode"],
//       raw: true,
//       include: [
//         {
//           model: Student,
//           require: true,
//           attributes: [[db.sequelize.fn('count', db.sequelize.col('teacherCode')), 'total']]
//         }
//       ]
//     })
//     .then(data =>{
//      res.send({success : true, content: data});
//     })
//     .catch(error=>{
//        res.status(500).send({message: error})
//     })
//     res.json(response);
//   } catch (err) {
//     console.log(err);
//   }
// }

thesis.creates = async (req, res) => {
  const year = req.body.year;
  const semester = req.body.semester;

  try {
    let filePath = __basedir + "/uploads/" + req.file.filename;

    readXlsxFile(filePath).then(rows => {
      rows.shift();
      const theses = [];
      const fetchApi = async () => {
        for (let i = 0; i < rows.length; i++) {
            const tempTeacher = rows[i][1].split('\n');

            const res2 = await Student.findAll({where: {name: rows[i][2]} })
            if (res2.length<1) {
              res.json({message: `Student ${rows[i][2]} not exit.`});
            }

            if (tempTeacher.length===1) {
              
              const res1 = await Lecturer.findAll({where: {name: rows[i][1]} })
              if (res1.length<1) {
                res.json({message: `Lecturer ${rows[i][1]} not exit.`});
              }
              
              let thesis = {
                language: rows[i][0],
                classCode: rows[i][3],
                lecturerId: res1[0].dataValues.id,
                lecturerName: res1[0].dataValues.name,
                studentName: res2[0].dataValues.name,
                studentId	: res2[0].dataValues.id,
                nvcl: rows[i][4],
                year: year,
                semester: semester
              }
              thesis.hour = getHourItem(thesis, null , 'kltn')
              theses.push(thesis);
            } else {

              await Promise.all(
                tempTeacher.map(async (item) => {
                  try{
                    return await Lecturer.findAll({where: {name: item} })
                  }
                  catch(err) {
                    console.log(err)
                  }
                })
              ).then(res3 => {
                if(res3.length<2) {
                  res.json({message: `Name lecturer not exit.`});
                }

                let thesis1 = {
                  language: rows[i][0],
                  classCode: rows[i][3],
                  lecturerId: res3[0][0].dataValues.id,
                  lecturerName: res3[0][0].dataValues.name,
                  studentName: res2[0].dataValues.name,
                  studentId	: res2[0].dataValues.id,
                  nvcl: rows[i][4],
                  year: year,
                  semester: semester,
                }
                let thesis2 = {
                  language: rows[i][0],
                  classCode: rows[i][3],
                  lecturerId: res3[1][0].dataValues.id,
                  lecturerName: res3[1][0].dataValues.name,
                  studentName: res2[0].dataValues.name,
                  studentId	: res2[0].dataValues.id,
                  nvcl: rows[i][4],
                  year: year,
                  semester: semester,
                }
                thesis1.hour = getHourItem(thesis1, null , 'kltn')
                thesis2.hour = getHourItem(thesis2, null , 'kltn')
                theses.push(thesis1);
                theses.push(thesis2);
              })
            }
        }
      }
      fetchApi().then(() => {
        Thesis.bulkCreate(theses).then(() =>{
         res.json(theses);
        })
        const lecturerIdKltn = Array.from(new Set(theses.map(item => item.lecturerId)))
        lecturerIdKltn.forEach(element => {
          report.updateHour(year, semester, 'kltn', element)
        });
      })
    });
  }
  catch(error){
    const result = {
      status: "fail",
      message: "Upload Error! message = " + error.message
    }
    res.json(result);
  }
}

thesis.update = async ( req, res) =>{
  const request = {
    studentId: req.body.studentId,
    name: req.body.name,
    lecturerId: req.body.lecturerId,
    nvcl: req.body.nvcl,
    year: req.body.year,
    semester: req.body.semester,
    classCode: req.body.classCode,
    type: req.body.type
  }
  try {
    const response = await Thesis.update( request ,{
      where: { id: req.body.id}
    })
    res.json(response);
  } catch (e) {
    console.log(e);
  }
}

thesis.checkYear = async (req, res) => {
  const year = req.body.year;
  const semester = req.body.semester;
  try {
    await Thesis.findAll({where: {
      [Op.and]: [
        { year: year },
        { semester: Number(semester) }
      ]}
    })
    .then( async (data) => {
      if(data.length===0) {
         res.json({message: "success"})
      } else {
        res.status(400).send({message: "School year already exists"})
      }
    }).catch(
      err => console.log(err)
    )
  } catch (e) {
      console.log(e);
    }
  }

module.exports = thesis;
