const db = require('../config/db');
const TempExcel = db.tempExcel;
const tempExcel = {}
const { Op } = require("sequelize");

tempExcel.list = async (req, res) => {
  const year = req.query.year;
  const semester = req.query.semester;
  const response = await TempExcel.findAll( (year && semester) ? {
    where: {
      [Op.and]: [
        { year: year },
        { semester: Number(semester) }
      ]
    }
  } : year ? {
    where: { year: year }
  } :  semester ? { where: { semester: semester } } : {})
  .then(function(data){
    const res = { success: true, content: data }
    return res;
  })
  .catch(error =>{
    const res = { success: false, error: error }
    return res;
  })
  res.json(response);

}

module.exports = tempExcel;
