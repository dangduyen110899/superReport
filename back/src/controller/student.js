const db = require('../config/db');
const Student = db.student;
const Class = db.class;
const readXlsxFile = require('read-excel-file/node');

const student = {}

student.list = async (req, res) => {
  const response = await Student.findAll({where: {status: 1}})
  res.json(response);
}

student.create = async ( req, res) =>{
  try {
    const request = req.body
    const response = await Student.create(request)
    res.json(response);
  } catch (e) {
    console.log(e);
  }
}

student.creates = async (req, res) => {
  try {
    let filePath = __basedir + "/uploads/" + req.file.filename;
    readXlsxFile(filePath).then( async (rows) => {
      rows.shift();
      const students = [];
      const classes = [];
      let length = rows.length;
      for(let i=0; i<length; i++){
        let student = {
          code: rows[i][0],
          name: rows[i][1],
          classCode: rows[i][5],
          gender: rows[i][3],
          birthday: rows[i][2],
          address: rows[i][4],
          status: 1
        }
        students.push(student);
        classes.push(rows[i][5])
      }
      const classC = Array.from(new Set(classes))
      const classX = []

      const defaultClass = await Class.findAll()

      const arrDefaultClasses = defaultClass.map(item => item.dataValues.code)
      for (let i = 0; i < classC.length; i++) {
        if(!arrDefaultClasses.includes(classC[i])) {
          classX.push({code: classC[i]})
        }
      }
      await Class.bulkCreate(classX)

      try {
        await Student.bulkCreate(students).then(data => {
          res.json(data);
        })
      } catch (error) {
        console.log(error)
      }
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

student.update = async ( req, res) =>{
  const request = {
    code: req.body.code,
    name: req.body.name,
    classCode: req.body.classCode,
    status: req.body.status
  }
  try {
    const response = await Student.update( request ,{
      where: { id: req.body.id}
    })
    res.json(response);
  } catch (e) {
    console.log(e);
  }
}

module.exports = student;
