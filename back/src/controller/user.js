const db = require('../config/db');
const User = db.user;
const user = {}

user.list = async (req, res) => {

  const response = await User.findAll()
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

module.exports = user;
