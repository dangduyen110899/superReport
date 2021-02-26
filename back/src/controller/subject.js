const db = require('../config/db');

const Subject = db.subject;

const subject = {}

subject.list = async (req, res) => {

  const response = await Subject.findAll()
  .then(function(data){
    const res = { success: true, data: data }
    return res;
  })
  .catch(error =>{
    const res = { success: false, error: error }
    return res;
  })
  res.json(response);

}

module.exports = subject;
