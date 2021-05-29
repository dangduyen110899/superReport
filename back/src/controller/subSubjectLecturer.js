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
  let response, countx
  const page = Number(req.query.page)
  const size = Number(req.query.size)
  if (Boolean(year) && Boolean(semester) && page && size) {
    const { count, rows } = await SubSubjectLecturer.findAndCountAll({
      where: {
        [Op.and]: [
          { year: year },
          { semester: Number(semester) }
        ]
      },
      offset: (page-1)*size, 
      limit: size
    })
    response = rows
    countx = count
  } else if (page && size) {
    const { count, rows } = await SubSubjectLecturer.findAndCountAll({
      offset: (page-1)*size, 
      limit: size
    })
    response = rows
    countx = count
  } else {
    const { count, rows } = await SubSubjectLecturer.findAndCountAll()
    response = rows  
    countx = count
  }
  res.json({data: response, total: countx});

}

subSubjectLecturer.detailList = async (req, res) => {
  const year = req.query.year;
  const semester = req.query.semester;
  let response, countx
  const page = Number(req.query.page)
  const size = Number(req.query.size)
  const lecturerId = Number(req.query.lecturerId)
  const type = Number(req.query.type)
  if (type === 0) {
    const { count, rows } = await SubSubjectLecturer.findAndCountAll({
      where: {
        [Op.and]: [
          { year: year },
          { semester: Number(semester) },
          { lecturerId: lecturerId }
        ]
      },
      offset: (page-1)*size, 
      limit: size
    })
    response = rows
    countx = count
  } else if (type === 1) {
    const { count, rows } = await SubSubjectLecturer.findAndCountAll({
      where: {
        [Op.and]: [
          { year: year },
          { lecturerId: lecturerId }
        ]
      },
      offset: (page-1)*size, 
      limit: size
    })
    response = rows
    countx = count
  } else {
    const { count, rows } = await SubSubjectLecturer.findAndCountAll({
      where: {
        [Op.and]: [
          { year: year },
          { semester: Number(semester) },
          { lecturerId: lecturerId }
        ]
      },
      offset: (page-1)*size, 
      limit: size
    })
    response = rows
    countx = count
  }
  res.json({data: response, total: countx});

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
  console.log(req.user)
  let program = req.user.role==='ADMIN' ? 0 : 1
  const year = req.body.year;
  const semester = req.body.semester;

  try {
    let filePath = __basedir + "/uploads/" + req.file.filename;

    readXlsxFile(filePath).then(rows => {
      rows.shift();
      const tkbs = [];
      const fetchApi = async () => {
        let jobTkb = "thuong"
        for (let i = 0; i < rows.length; i++) {
          if (rows[i][0] == 'Chương trình đào tạo chat luong cao') {
            jobTkb = "clc"
          }
          if ((rows[i][0] ? !rows[i][0].includes("Các học phần") : true) && rows[i][1] && rows[i][2] && rows[i][3] && rows[i][4]) {
            const tempTeacher = rows[i][5].split('\n');
            if (tempTeacher.length===1) {
              const res1 = await Lecturer.findAll({where: {name: rows[i][5].trim()} })
              if(res1.length<1) {
                res.json({message: `Lecturer ${rows[i][5]} not exit.`});
              }
              let subSubjectLecturer = {
                day: rows[i][6],
                time: rows[i][7],
                total_student: rows[i][4],
                total_tc: rows[i][2],
                lecturerId: res1[0].dataValues.id,
                classSubjectCode: rows[i][3],
                teacherNumber:  1,
                lecturerName: rows[i][5].trim(),
                semester: Number(semester),
                year: year,
                address: rows[i][8],
                note: rows[i][9],
                type: rows[i][9] === "CL" ? 0 : 1,
                language: rows[i][9] === "TA" ? 1 : 0,
                subjectCode: rows[i][0],
                job: jobTkb,
                nameSubject: rows[i][1],
                program: program
              }
              subSubjectLecturer.hour = getHourItem(subSubjectLecturer, (rows[i][9] === "CL" || rows[i][9]==="TA") ? 0 : 1, 'tkb',1)
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

                for (let j = 0; j < res02.length; j++) {
                  if(res02[j].length<1) {
                    res.json({message: `Name lecturer ${tempTeacher[j].trim()} not exit.`});
                  }
                  let subSubjectLecturer1 = {
                    day: rows[i][6],
                    time: rows[i][7],
                    total_student: rows[i][4],
                    total_tc: rows[i][2],
                    lecturerId: res02[j][0].dataValues.id,
                    classSubjectCode: rows[i][3],
                    teacherNumber:  res02.length,
                    lecturerName: res02[j][0].dataValues.name,
                    semester: Number(semester),
                    year: year,
                    address: rows[i][8],
                    note: rows[i][9],
                    type: (rows[i][9] === "CL") ? 0 : 1,
                    language: rows[i][9] === "TA" ? 1 : 0,
                    subjectCode: rows[i][0],
                    job: jobTkb,
                    nameSubject: rows[i][1],
                    program: program
                  }
                  subSubjectLecturer1.hour = getHourItem(subSubjectLecturer1, (rows[i][9] === "CL" || rows[i][9]==="TA") ? 0 : 1, 'tkb', 2)
                  tkbs.push(subSubjectLecturer1);
                }
              })
            }
          }
        }
      }
      fetchApi().then( async() => {

        await SubSubjectLecturer.bulkCreate(tkbs).then( () =>{
          // res.json(tkbs);
        })
        const lecturerIdTkb = Array.from(new Set(tkbs.map(item => item.lecturerId)))

        for (let i = 0; i < lecturerIdTkb.length; i++) {
          await report.updateHour(year, semester, program ? 'tkb sau đh' : 'tkb trong đh', lecturerIdTkb[i])
        }
        res.json(tkbs);
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
