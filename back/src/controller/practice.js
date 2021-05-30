const db = require('../config/db');
const Practice = db.practice;
const Lecturer = db.lecturer;
const { Op } = require("sequelize");

const readXlsxFile = require('read-excel-file/node');
const report = require('./report');
const getHourItem = require('./getHourItem');
const practice = {}

practice.list = async (req, res) => {
  const year = req.query.year;
  const semester = req.query.semester;
  let response, countx
  const page = Number(req.query.page) 
  const size = Number(req.query.size) || 1000000
  if (Boolean(year) && Boolean(semester) && page && size) {
    const { count, rows } = await Practice.findAndCountAll({
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
    const { count, rows } = await Practice.findAndCountAll({
      offset: (page-1)*size, 
      limit: size
    })
    response = rows
    countx = count
  } else {
    const { count, rows } = await Practice.findAndCountAll()
    response = rows
    countx = count
  }
  res.json({data: response, total: countx});

}

practice.detailList = async (req, res) => {
  const year = req.query.year;
  const semester = req.query.semester;
  let response, countx
  const page = Number(req.query.page)
  const size = Number(req.query.size)
  const lecturerId = Number(req.query.lecturerId)
  const type = Number(req.query.type)
  if (type === 0) {
    const { count, rows } = await Practice.findAndCountAll({
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
    const { count, rows } = await Practice.findAndCountAll({
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
    const { count, rows } = await Practice.findAndCountAll({
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

practice.creates = async (req, res) => {
  const year = req.body.year;
  const semester = Number(req.body.semester);

  try {
    let filePath = __basedir + "/uploads/" + req.file.filename;

    readXlsxFile(filePath).then(rows => {
      rows.shift();
      const theses = [];
      const fetchApi = async () => {
        for (let i = 0; i < rows.length; i++) {
            const res1 = await Lecturer.findAll({where: {name: rows[i][0]}})
            if (res1.length<1) {
              res.json({message: `Lecturer ${rows[i][0]} not exit.`});
            }
            
            let practice = {
              date: rows[i][1],
              note: rows[i][2],
              lecturerId: res1[0].dataValues.id,
              lecturerName: rows[i][0].trim(),
              year: year,
              semester: semester
            }
            practice.hour = getHourItem(practice, null , 'tttd',1,1)
            theses.push(practice);
        }
      }
      fetchApi().then( async () => {
        try {
          await Practice.bulkCreate(theses).then(() =>{
            // res.json(theses);
           })
        } catch (error) {
          console.log(error)
        }
        const lecturerIdKltn = Array.from(new Set(theses.map(item => item.lecturerId)))

        for (let i = 0; i < lecturerIdKltn.length; i++) {
          await report.updateHour(year, semester, 'tttd', lecturerIdKltn[i])
        }

        res.json(theses);

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

practice.checkYear = async (req, res) => {
  const year = req.body.year;
  const semester = req.body.semester;
  try {
    await Practice.findAll({where: {
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

module.exports = practice;
