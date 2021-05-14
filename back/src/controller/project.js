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

    readXlsxFile(filePath).then(rows => {
      rows.shift();
      const projects = [];
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
                nameProject: Sequelize.STRING,
                semester: Sequelize.INTEGER,
                year: Sequelize.STRING,
                classCode: Sequelize.STRING,
                lecturerName: Sequelize.STRING,
                studentName: Sequelize.STRING,
                studentCode: Sequelize.STRING,
                note: { type: Sequelize.STRING, defaultValue: ''},
                teacherNumber: { type: Sequelize.INTEGER, defaultValue: 1}
              }
              project.hour = getHourItem(project, null , 'kltn')
              projects.push(project);
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
                  if(res3[j].length<1 || tempTeacher.length!== res3.length) {
                    res.json({message: `Name lecturer ${tempTeacher[j].trim()} not exit.`});
                  }
                  let project1 = {           
                    nameProject: Sequelize.STRING,
                    semester: Sequelize.INTEGER,
                    year: Sequelize.STRING,
                    classCode: Sequelize.STRING,
                    lecturerName: Sequelize.STRING,
                    studentName: Sequelize.STRING,
                    studentCode: Sequelize.STRING,
                    note: { type: Sequelize.STRING, defaultValue: ''},
                    teacherNumber: res3.length
                  }
                  project1.hour = getHourItem(project1, null , 'kltn')
                  projects.push(project1);
                }
              })
            }
        }
      }
      fetchApi().then( async () => {
        await Project.bulkCreate(projects)
        const lecturerIdDATN = Array.from(new Set(projects.map(item => item.lecturerId)))

        for (let i = 0; i < lecturerIdDATN.length; i++) {
          await report.updateHour(year, semester, 'datn', lecturerIdDATN[i])
        }

        res.json(projects);

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

project.checkYear = async (req, res) => {
  const year = req.body.year;
  const semester = req.body.semester;
  const data = await Project.findAll({where: {
    [Op.and]: [
      { year: year },
      { semester: Number(semester) }
    ]}
  })
  if(data.length===0) {
    res.json({message: "success"})
    } else {
    res.status(400).send({message: "School year already exists"})
    }
}

module.exports = project;
