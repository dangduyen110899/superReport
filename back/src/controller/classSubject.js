const db = require('../config/db');
const ClassSubject = db.classSubject;

const classSubject = {}

classSubject.list = async (req, res) => {
  const response = await ClassSubject.findAll()
  res.json(response);
}

classSubject.create = async ( req, res) =>{
  try {
    const response = await ClassSubject.create(req.body)
    res.json(response);
  } catch (err) {
    console.log(err);
  }
}

module.exports = classSubject;
