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
  const request1 = req.body
  let response1 = await Lecturer.findAll({ where: {
    [Op.or]: [
      {name: request1.name, đh : 1},
      {email: request1.email, đh : 1}
    ]
  }})
  let response2
  let response3
  if(req.user.role === 'ADMIN1') {
    response2 = await Lecturer.findAll({ where: {
      [Op.or]: [
        {name: request1.name, sđh : 1},
        {email: request1.email, sđh : 1}
      ]
    }})
    if (response2[0]) {
      res.json({message: `Giảng viên có tên hoặc email đã tồn tại.`});
    } 
    if (response1[0]) {
      console.log(response1)
      response3 = await Lecturer.update({...response1[0].dataValues, sđh: 1},{ where: {name: request1.name}})
    } else {
      response3 = await Lecturer.create({...request1, sđh: 1, đh: 0},{ where: {name: request1.name}})
    }
  } else {
    if (response1[0]) {
      // trung name hoac email
      res.json({message: `Giảng viên có tên hoặc email đã tồn tại.`});
    } else {
      response3 = await Lecturer.create({...request1, đh: 1},{ where: {name: request1.name}})
    }
  }
  res.json(response3)
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
            // ...condition
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
        if (res1 && res1[0] && res1[0].dataValues) {
          // update
          await Lecturer.update( {...res1.dataValues, ...program},{
            where: { id: res1[0].dataValues.id}
          })
        } else  {
          //create
          try {
            await Lecturer.create(request)
          } catch (error) {
            console.log(error)
          }
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
    const response =  await Lecturer.update( request,{
      where: { id: req.body.id}
    })
    console.log(response)
    res.json(response);

  } catch (er) {
    res.json({message: `Giảng viên có tên hoặc email đã tồn tại.`});
  }
}

module.exports = lecturer;
