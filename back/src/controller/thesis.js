const db = require('../config/db');
const Thesis = db.thesis;
const Lecturer = db.lecturer;
const TempExcel = db.tempExcel;
const Student = db.student;
const { Op } = require("sequelize");

const readXlsxFile = require('read-excel-file/node');

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

thesis.table = async ( req, res) => {
  try {
    const response = await Lecturer.findAll({
      include: [
        {
          model: TempExcel,
        }
      ]
    })
    .then(data =>{
     res.send({success : true, content: data});
    })
    .catch(error=>{
       res.status(500).send({message: error})
    })
    res.json(response);
  } catch (err) {
    console.log(err);
  }
}

thesis.creates = async (req, res) => {
  const year = req.body.year;
  const semester = req.body.semester;

  try {
    let filePath = __basedir + "/uploads/" + req.file.filename;

    readXlsxFile(filePath).then(rows => {
      rows.shift();
      const theses = [];
      async function huhu(res1, res2,item) {
        let thesis = {
          type: item[0],
          classCode: item[3],
          lecturerId: res1[0].dataValues.id,
          lecturerName: res1[0].dataValues.name,
          studentName: res2[0].dataValues.name,
          studentId	: res2[0].dataValues.id,
          nvcl: item[4],
          year: year,
          semester: semester
        }
        theses.push(thesis);
        return theses
      }
      const fetchApi = async () => {
        for (let i = 0; i < rows.length; i++) {
          try {
            const res1 = await Lecturer.findAll({where: {name: rows[i][1]} })
            const res2 = await Student.findAll({where: {name: rows[i][2]} })
            if (res1.length<1 || res2.length<1) {
              res.json({message: `Lecturer ${rows[i][1]} or student ${rows[i][2]} not exit.`});
            }
            await huhu(res1, res2, rows[i]);
          } catch(err) { console.log(err) }
        }
      }
      fetchApi().then(() => {
        Thesis.bulkCreate(theses).then(() =>{
         res.json(theses);
        })
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
