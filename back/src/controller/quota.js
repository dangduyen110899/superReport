const db = require('../config/db');
const Quota = db.quota;
const quota = {}
const readXlsxFile = require('read-excel-file/node');
const { Op } = require("sequelize");
quota.list = async (req, res) => {
  const page = Number(req.query.page)
  const size = Number(req.query.size)
  try {
    const { count, rows: response } = await Quota.findAndCountAll({
      where: {status: 1},
      offset: (page-1)*size, 
      limit: size
    })
    res.json({data: response, total: count});
  }
  catch (e) {
    console.log(e);
  }

}

quota.create = async ( req, res) =>{
  try {
    const request = req.body
    const response = await Quota.create(request)
    res.json(response);
  } catch (er) {
    res.json(er)
  }
}

quota.creates = async (req, res) => {
  try {
    let filePath = __basedir + "/uploads/" + req.file.filename;

    readXlsxFile(filePath).then(rows => {
      rows.shift();

      const quotas = [];
      let length = rows.length;
      for(let i=0; i<length; i++){
        let quota = {
          position: rows[i][0],
          rate: rows[i][1],
        }
        quotas.push(quota);
      }

      Quota.bulkCreate(quotas).then(data => {
        res.json(data);
      }).catch(er => {
        console.log(er)
        res.status(400).send(er.message);
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

quota.update = async ( req, res) =>{
  const request = {
    position: req.body.position,
    rate: req.body.rate,
    status: req.body.status,
  }
  try {
    const response = await Quota.update( request,{
      where: { id: req.body.id}
    })
    res.json(response);

  } catch (er) {
    res.json(er)
  }
}

module.exports = quota;
