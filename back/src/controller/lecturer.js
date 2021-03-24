const db = require('../config/db');
const Lecturer = db.lecturer;
const lecturer = {}
const readXlsxFile = require('read-excel-file/node');

lecturer.list = async (req, res) => {
  try {
    const response = await Lecturer.findAll({where: {status: 1}})
    res.json(response);
  }
  catch (e) {
    console.log(e);
  }

}

lecturer.create = async ( req, res) =>{
  try {
    const request = req.body
    const response = await Lecturer.create(request)
    res.json(response);
  } catch (er) {
    res.json(er)
  }
}

lecturer.creates = async (req, res) => {
  try {
    let filePath = __basedir + "/uploads/" + req.file.filename;

    readXlsxFile(filePath).then(rows => {
      rows.shift();

      const lecturers = [];
      let length = rows.length;
      for(let i=0; i<length; i++){
        let lecturer = {
          name: rows[i][0],
          email: rows[i][1],
          programs: rows[i][4],
          status: 1,
          department: rows[i][2],
          subject: rows[i][3],
        }
        lecturers.push(lecturer);
      }

      Lecturer.bulkCreate(lecturers).then(data => {
        res.json(data);
      }).catch(er => res.json(er))
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

lecturer.update = async ( req, res) =>{
  const request = {
    name: req.body.name,
    email: req.body.email,
    programs: req.body.programs,
    status: req.body.status,
    department: req.body.department,
    subject: req.body.subject,
  }
  try {
    const response = await Lecturer.update( request,{
      where: { id: req.body.id}
    })
    res.json(response);

  } catch (er) {
    res.json(er)
  }
}

module.exports = lecturer;
