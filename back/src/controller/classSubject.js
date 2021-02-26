const db = require('../config/db');
const ClassSubject = db.classSubject;

const classSubject = {}

classSubject.list = async (req, res) => {

  const response = await ClassSubject.findAll()
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

classSubject.create = async ( req, res) =>{
  try {
    const response = await ClassSubject.create(req.body)
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

module.exports = classSubject;
