const db = require('../config/db');
const SubSubjectLecturer = db.subSubjectLecturer;
const sequelize = db.sequelize
const Lecturer = db.lecturer;
const Thesis = db.thesis;
const subSubjectLecturer = {}
const { Op } = require("sequelize");

const readXlsxFile = require('read-excel-file/node');
const report = require('./report');
const getHourItem = require('./getHourItem');

subSubjectLecturer.list = async (req, res) => {
  const year = req.query.year;
  const semester = req.query.semester;
  let response;

  if (Boolean(year) && Boolean(semester)) {
    response = await SubSubjectLecturer.findAll({
      where: {
        [Op.and]: [
          { year: year },
          { semester: Number(semester) }
        ]
      }
    })
  } else {
    response = await SubSubjectLecturer.findAll()
  }
  res.json(response);

}

subSubjectLecturer.create = async ( req, res) =>{
  try {
    req.body.hour = getHourItem(req.body)
    const response = await SubSubjectLecturer.create(req.body)
    report.updateHour(req.body.year, req.body.semester, 'tkb')
    res.json(response);
  } catch (err) {
    console.log(err);
  }
}

subSubjectLecturer.checkYear = async (req, res) => {
  const year = req.body.year;
  const semester = req.body.semester;

  try {
    await SubSubjectLecturer.findAll({where: {
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

subSubjectLecturer.creates = async (req, res) => {
  const year = req.body.year;
  const semester = req.body.semester;

  try {
    let filePath = __basedir + "/uploads/" + req.file.filename;

    readXlsxFile(filePath).then(rows => {
      rows.shift();
      const tkbs = [];
      const fetchApi = async () => {
        for (let i = 0; i < rows.length; i++) {
            const tempTeacher = rows[i][6].split('\n');
            if (tempTeacher.length===1) {
              const res1 = await Lecturer.findAll({where: {name: rows[i][6].trim()} })
              if(res1.length<1) {
                res.json({message: `Lecturer ${rows[i][6]} not exit.`});
              }
              let subSubjectLecturer = {
                type: rows[i][2],
                day: rows[i][3],
                time: rows[i][4],
                total_student: rows[i][5],
                total_tc: rows[i][7],
                lecturerId: res1[0].dataValues.id,
                classSubjectCode: rows[i][1],
                teacherNumber:  1,
                lecturerName: rows[i][6].trim(),
                semester: Number(semester),
                year: year,
                subjectCode: rows[i][0],
                job: rows[i][8],
              }
              subSubjectLecturer.hour = getHourItem(subSubjectLecturer, rows[i][2], 'tkb',1)
              tkbs.push(subSubjectLecturer);
            } else {
              await Promise.all(
                tempTeacher.map(async (item) => {
                  try{
                    return await Lecturer.findAll({where: {name: item.trim()} })
                  }
                  catch(err) {
                    console.log(err)
                  }
                })
              ).then(res02 => {
                if(res02[0].length<1 || res02[1].length<1) {
                  res.json({message: `Name lecturer not exit.`});
                }
                let subSubjectLecturer1 = {
                  type: rows[i][2],
                  day: rows[i][3],
                  time: rows[i][4],
                  total_student: rows[i][5],
                  total_tc: rows[i][7],
                  lecturerId: res02[0][0].dataValues.id,
                  classSubjectCode: rows[i][1],
                  teacherNumber:  2,
                  lecturerName: tempTeacher[0].trim(),
                  semester: Number(semester),
                  year: year,
                  subjectCode: rows[i][0],
                  job: rows[i][8],
                }

                let subSubjectLecturer2 = {
                  type: rows[i][2],
                  day: rows[i][3],
                  time: rows[i][4],
                  total_student: rows[i][5],
                  total_tc: rows[i][7],
                  lecturerId: res02[1][0].dataValues.id,
                  classSubjectCode: rows[i][1],
                  teacherNumber:  2,
                  lecturerName: tempTeacher[1].trim(),
                  semester: Number(semester),
                  year: year,
                  subjectCode: rows[i][0],
                  job: rows[i][8],
                }
                subSubjectLecturer1.hour = getHourItem(subSubjectLecturer1, rows[i][2], 'tkb', 2)
                subSubjectLecturer2.hour = getHourItem(subSubjectLecturer2, rows[i][2], 'tkb', 2)
                tkbs.push(subSubjectLecturer1);
                tkbs.push(subSubjectLecturer2);
              })
            }
        }
      }
      fetchApi().then(() => {

        SubSubjectLecturer.bulkCreate(tkbs).then( () =>{
          res.json(tkbs);
        })
        const lecturerIdTkb = Array.from(new Set(tkbs.map(item => item.lecturerId)))

        for (let i = 0; i < lecturerIdTkb.length; i++) {
          report.updateHour(year, semester, 'tkb', lecturerIdTkb[i])
        }

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

module.exports = subSubjectLecturer;
