const db = require('../config/db');
const SubSubjectLecturer = db.subSubjectLecturer;
const sequelize = db.sequelize
const Lecturer = db.lecturer;
const Thesis = db.thesis;
const subSubjectLecturer = {}

const { Op } = require("sequelize");

const readXlsxFile = require('read-excel-file/node');

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
    .then(function(data){
      const res = { success: true, data: data }
      return res;
    })
    .catch(error =>{
      const res = { success: false, error: error }
      return res;
    })
  } else {
    response = await SubSubjectLecturer.findAll()
    .then(function(data){
      const res = { success: true, data: data }
      return res;
    })
    .catch(error =>{
      const res = { success: false, error: error }
      return res;
    })
  }
  res.json(response);

}

subSubjectLecturer.create = async ( req, res) =>{
  try {
    const response = await SubSubjectLecturer.create(req.body)
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
                const res = await Lecturer.findAll({where: {name: rows[i][6]} })
                let subSubjectLecturer = {
                  type: rows[i][2],
                  day: rows[i][3],
                  time: rows[i][4],
                  total_student: rows[i][5],
                  total_tc: rows[i][7],
                  lecturerId: res[0].dataValues.id,
                  classSubjectCode: rows[i][1],
                  teacherNumber:  1,
                  semester: Number(semester),
                  year: year,
                  subjectCode: rows[i][0],
                  job: rows[i][8],
                }
                tkbs.push(subSubjectLecturer);
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
                ).then(res02 => {
                  let subSubjectLecturer1 = {
                    type: rows[i][2],
                    day: rows[i][3],
                    time: rows[i][4],
                    total_student: rows[i][5],
                    total_tc: rows[i][7],
                    lecturerId: res02[0][0].dataValues.id,
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
                    lecturerId: res02[1][0].dataValues.id,
                    classSubjectCode: rows[i][1],
                    teacherNumber:  2,
                    semester: Number(semester),
                    year: year,
                    subjectCode: rows[i][0],
                    job: rows[i][8],
                  }
                  tkbs.push(subSubjectLecturer1);
                  tkbs.push(subSubjectLecturer2);
                })
              }
            }
      }
      fetchApi().then(() => {
        SubSubjectLecturer.bulkCreate(tkbs).then( resData =>{
          const result = {
            status: "ok",
            data: tkbs,
            data2: resData,
            message: "Upload Successfully!",
          }
        res.json(result);
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

subSubjectLecturer.report = ( req, res) => {
  const huhu = async () => {
  try {
    return await Lecturer.findAll({where: {status: 1}})
    .catch(error=>{
       res.status(500).send({message: error})
    })
  } catch (err) {
    console.log(err);
  }
  }
  huhu().then(data =>{
    const arr = []
    data.forEach(item => {
      arr.push({
        year: req.body.year,
        semester: req.body.semester,
        ...item.dataValues
      })
    })
    return arr;
  }).then(arr => {
    let arrTemp = []
    Promise.all(arr.map(async (item) => {
        try{
          const res1 = await SubSubjectLecturer.findOne({
            where: {
              [Op.and]: [
                { year: item.year },
                { semester: item.semester },
                { lecturerId: item.id}
              ]
            },
            attributes: ['lecturerId', [sequelize.fn('sum', sequelize.col('id')), 'totalTkb']],
            group : ['year', 'semester', 'lecturerId'],
          })

          const res2 = await Thesis.findOne({
            where: {
              [Op.and]: [
                { year: item.year },
                { semester: item.semester },
                { lecturerId: item.id}
              ]
            },
            attributes: ['lecturerId', [sequelize.fn('sum', sequelize.col('id')), 'totalKltn']],
            group : ['year', 'semester', 'lecturerId'],
          })

          if (res1 && res2) {
            arrTemp.push({lecturerId: res1.dataValues.lecturerId, totalTkb: res1.dataValues.totalTkb, totalKltn: res2.dataValues.totalKltn})
          } else if(res1) {
            arrTemp.push(res1)
          } else if(res2){
            arrTemp.push(res2)
          }

        } catch(err) {
          console.log(err)
        }
      }))
   .then( ()=> {
      console.log(arrTemp)
      // const result = arrTemp.filter(element => element!==null)

      res.json(arrTemp)
    })
  })
}


module.exports = subSubjectLecturer;
