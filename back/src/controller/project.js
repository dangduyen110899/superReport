const db = require('../config/db');
const Project = db.project;
const Lecturer = db.lecturer;
const Student = db.student;
const { Op } = require("sequelize");

const readXlsxFile = require('read-excel-file/node');
const report = require('./report');
const getHourItem = require('./getHourItem');
const project = {}

project.list = async (req, res) => {
  const year = req.query.year;
  const semester = req.query.semester;
  let response, countx
  const page = Number(req.query.page)
  const size = Number(req.query.size)
  if (Boolean(year) && Boolean(semester) && page && size) {
    const { count, rows } = await Project.findAndCountAll({
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
    const { count, rows } = await Project.findAndCountAll({
      offset: (page-1)*size, 
      limit: size
    })
    response = rows
    countx = count
  } else {
    const { count, rows } = await Project.findAndCountAll()
    response = rows
    countx = count
  }
  res.json({data: response, total: countx});

}

project.detailList = async (req, res) => {
  const year = req.query.year;
  const semester = req.query.semester;
  let response, countx
  const page = Number(req.query.page)
  const size = Number(req.query.size)
  const lecturerId = Number(req.query.lecturerId)
  const type = Number(req.query.type)
  if (type === 0) {
    const { count, rows } = await Project.findAndCountAll({
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
    const { count, rows } = await Project.findAndCountAll({
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
    const { count, rows } = await Project.findAndCountAll({
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

project.creates = async (req, res) => {
  const year = req.body.year;
  const semester = Number(req.body.semester);

  try {
    let filePath = __basedir + "/uploads/" + req.file.filename;
    console.log(filePath)
    readXlsxFile(filePath).then(rows => {
      rows.shift();
      const theses = [];
      const fetchApi = async () => {
        for (let i = 0; i < rows.length; i++) {
            const tempTeacher = rows[i][5].split('\n');

            const res2 = await Student.findAll({where: {code: rows[i][0]} })
            if (res2.length<1) {
              res.json({message: `Student ${rows[i][1]} not exit.`});
            }

            if (tempTeacher.length===1) {
              const res1 = await Lecturer.findAll({where: {name: rows[i][5].trim()}})
              if (res1.length<1) {
                res.json({message: `Lecturer ${rows[i][5]} not exit.`});
              }
              
              let project = {
                studentCode: rows[i][0],
                studentName: rows[i][1],
                birthday: rows[i][2],
                classCode: rows[i][3],
                nameProject: rows[i][4],
                note: rows[i][6],
                language: rows[i][7],
                lecturerId: res1[0].dataValues.id,
                lecturerName: rows[i][5].trim(),
                studentId	: res2[0].dataValues.id,
                nvcl: rows[i][8],
                year: year,
                semester: semester
              }
              project.hour = getHourItem(project, null , 'datn',1,1)
              theses.push(project);
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

                for (let j = 0; j < res3.length; j++) {
                  if(res3[j].length<1) {
                    res.json({message: `Name lecturer ${tempTeacher[j].trim()} not exit.`});
                  }
                  let project1 = {           
                    studentCode: rows[i][0],
                    studentName: rows[i][1],
                    birthday: rows[i][2],
                    classCode: rows[i][3],
                    nameProject: rows[i][4],
                    note: rows[i][6],
                    language: rows[i][7],
                    lecturerId: res3[j][0].dataValues.id,
                    lecturerName: res3[j][0].dataValues.name,
                    studentId	: res2[0].dataValues.id,
                    nvcl: rows[i][8],
                    year: year,
                    semester: semester,
                    teacherNumber: res3.length
                  }
                  project1.hour = getHourItem(project1, null , 'datn', res3.length, j+1)
                  theses.push(project1);
                }
              })
            }
        }
      }
      fetchApi().then( async () => {
        try {
          await Project.bulkCreate(theses).then(() =>{
            // res.json(theses);
           })
        } catch (error) {
          console.log(error)
        }
        const lecturerIddatn = Array.from(new Set(theses.map(item => item.lecturerId)))

        for (let i = 0; i < lecturerIddatn.length; i++) {
          await report.updateHour(year, semester, 'datn', lecturerIddatn[i])
        }

        res.json(theses);

      })
    });
  }
  catch(error){
    console.log(error)
    const result = {
      status: "fail",
      message: "Upload Error! message = " + error.message
    }
    res.json(result);
  }
}

project.checkYear = async (req, res) => {
  const year = req.body.year;
  const semester = req.body.semester;
  try {
    await Project.findAll({where: {
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

module.exports = project;
