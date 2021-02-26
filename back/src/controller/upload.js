const db = require('../config/db');
const { Op } = require("sequelize");
const readXlsxFile = require('read-excel-file/node');

const TempExcel = db.tempExcel;
const Thesis = db.thesis;
const SubSubjectLecturer = db.subSubjectLecturer;

const upload = {}

upload.tkb = async (req, res) => {
  const year = req.body.year;
  const semester = req.body.semester;

  try {
    let filePath = __basedir + "/uploads/" + req.file.filename;

    readXlsxFile(filePath).then(rows => {
      rows.shift();

      const temp = [];
      for(let i=0; i<rows.length; i++){
        const tempTeacher = rows[i][6].split('\n');
        if (tempTeacher.length>1) {
          let subSubjectLecturer1 = {
            type: rows[i][2],
            day: rows[i][3],
            time: rows[i][4],
            total_student: rows[i][5],
            total_tc: rows[i][7],
            teacherCode: tempTeacher[0],
            classSubjectCode: rows[i][1],
            teacherNumber:  2,
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
            teacherCode: tempTeacher[1],
            classSubjectCode: rows[i][1],
            teacherNumber:  2,
            semester: Number(semester),
            year: year,
            subjectCode: rows[i][0],
            job: rows[i][8],
          }
          temp.push(subSubjectLecturer1);
          temp.push(subSubjectLecturer2);
        }
        else {
          let subSubjectLecturer = {
            type: rows[i][2],
            day: rows[i][3],
            time: rows[i][4],
            total_student: rows[i][5],
            total_tc: rows[i][7],
            teacherCode: rows[i][6],
            classSubjectCode: rows[i][1],
            teacherNumber:  1,
            semester: Number(semester),
            year: year,
            subjectCode: rows[i][0],
            job: rows[i][8],
          }
          temp.push(subSubjectLecturer);
        }
      }

      SubSubjectLecturer.bulkCreate(temp).then( async () => {
          await TempExcel.findAll({
            where: {
              [Op.and]: [
                { year: year },
                { semester: Number(semester) }
              ]
            }
          })
          .then( response => {
            const temp = response[0].dataValues
            TempExcel.update({
              year: year,
              semester: semester,
              nameTkb:  req.file.originalname,
              nameKltn: temp.nameKltn,
              nameDatn: temp.nameDatn,
              nameLvts: temp.nameLvts,
            },{
              where: { id: temp.id}
            })
          }).catch(
            err => console.log(err)
          )
        const result = {
          status: "ok",
          filename: req.file,
          message: "Upload Successfully!",
        }
      res.json(result);
      });

    });

  } catch(error){
      const result = {
        status: "fail",
        filename: req.file,
        message: "Upload Error! message = " + error.message
      }
      res.json(result);
  }
}


module.exports = upload;
