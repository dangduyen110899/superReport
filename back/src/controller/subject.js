const db = require('../config/db');

const Subject = db.subject;

const subject = {}

subject.list = async (req, res) => {
  const response = await Subject.findAll()
  res.json(response);
}

module.exports = subject;
