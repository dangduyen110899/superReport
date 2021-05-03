const db = require('../config/db');
const Lecturer = db.lecturer;
const lecturer = {}
const readXlsxFile = require('read-excel-file/node');
const { Op } = require("sequelize");
const Quota = db.quota;

lecturer.list = async (req, res) => {
  let program
  if(req.user.role === 'ADMIN') {
    program = {đh : 1}
  } else {
    program = {sđh: 1}
  }
  const page = Number(req.query.page)
  const size = Number(req.query.size)
  const mode = Number(req.query.mode)
  try {
    const { count, rows: response } = await Lecturer.findAndCountAll({
      where: {status: 1, mode: mode, ...program},
      offset: (page-1)*size, 
      limit: size
    })
    res.json({data: response, total: count});
  }
  catch (e) {
    console.log(e);
  }

}

lecturer.create = async ( req, res) =>{
  let program
  if(req.user.role === 'ADMIN') {
    program = {đh : 1}
  } else {
    program = {sđh: 1}
  }
  try {
    const request = req.body
    const response = await Lecturer.create({...request, ...program})
    res.json(response);
  } catch (er) {
    res.json(er)
  }
}

lecturer.creates = async (req, res) => {
  let program
  let condition
  if(req.user.role === 'ADMIN') {
    program = {đh : 1}
    condition = {đh : 0}
  } else {
    program = {sđh: 1}
    condition = {sđh : 0}
  }
  try {
    let filePath = __basedir + "/uploads/" + req.file.filename;

    readXlsxFile(filePath).then( async (rows) => {
      rows.shift();

      let length = rows.length;
      for(let i=0; i<length; i++){

        const res1 = await Lecturer.findAll({
          where: {
            name: rows[i][0],
            email: rows[i][1],
            programs: rows[i][4],
            status: 1,
            department: rows[i][2],
            subject: rows[i][3],
            mode: req.body.mode,
            ...condition
          }
        })

        const request = {
          name: rows[i][0],
          email: rows[i][1],
          programs: rows[i][4],
          status: 1,
          department: rows[i][2],
          subject: rows[i][3],
          mode: req.body.mode,
          position: rows[i][5] || '',
          ...program
        }
        if (res1 && res1[0].dataValues) {
          // update
          Lecturer.update( {...res1.dataValues, ...program},{
            where: { id: res1[0].dataValues.id}
          })
        } else  {
          //create
          await Lecturer.create(request)
        }
      }
      res.json()
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
  let program
  if(req.user.role === 'ADMIN') {
    program = {đh : 1}
  } else {
    program = {sđh: 1}
  }
  const request = {
    name: req.body.name,
    email: req.body.email,
    programs: req.body.programs,
    status: req.body.status,
    department: req.body.department,
    subject: req.body.subject,
    position: req.body.position,
    // quotumId: req.body.quotumId
    ...program
  }
  try {
    const response = Lecturer.update( request,{
      where: { id: req.body.id}
    })
    res.json(response);

  } catch (er) {
    res.json(er)
  }
}

module.exports = lecturer;
