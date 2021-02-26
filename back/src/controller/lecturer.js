const db = require('../config/db');
const Lecturer = db.lecturer;
const lecturer = {}
const readXlsxFile = require('read-excel-file/node');

lecturer.list = async (req, res) => {
  const response = await Lecturer.findAll({where: {status: 1}})
  .then(function(data){
    res.send({success : true, data: data});
  })
  .catch(error =>{
    res.status(400).send({message: error})
  })
  res.json(response);

}

lecturer.create = async ( req, res) =>{
  try {
    const request = req.body
    const response = await Lecturer.create(request)
    .then(function(data){
      res.send({success : true, data: data});
    })
    .catch(error=>{
      res.status(400).send({message: error});
    })
    res.json(response);

  } catch (e) {
    console.log(e);
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
          programs: rows[i][2],
          status: 1
        }
        lecturers.push(lecturer);
      }

      Lecturer.bulkCreate(lecturers).then(data => {
        const result = {
          status: "ok",
          data: data,
          message: "Upload Successfully!",
        }
        res.json(result);
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

lecturer.update = async ( req, res) =>{
  const request = {
    name: req.body.name,
    email: req.body.email,
    programs: req.body.programs,
    status: req.body.status
  }
  try {

    const response = await Lecturer.update( request,{
      where: { id: req.body.id}
    })
    .then(function(data){
      res.send({success : true, data: data});
    })
    .catch(error=>{
      res.status(400).send({message: error});
    })
    res.json(response);

  } catch (e) {
    console.log(e);
  }
}

module.exports = lecturer;
