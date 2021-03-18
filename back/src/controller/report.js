const db = require('../config/db');
const SubSubjectLecturer = db.subSubjectLecturer;
const sequelize = db.sequelize
const Thesis = db.thesis;
const ReportHour = db.reportHour;
const report = {}

const { Op } = require("sequelize");

report.updateHour = async ( year, semester, name, gvId) => {
  switch (name) {
    case "tkb":

      SubSubjectLecturer.findAll({
        where: {
          [Op.and]: [
            { year: year },
            { semester: Number(semester) },
            { lecturerId: gvId }
          ]
        },
        attributes: ['lecturerId','lecturerName', 'year', 'semester',[sequelize.fn('sum', sequelize.col('hour')), 'hourSchedule']],
      }).then( async (response1) => {
        const response2 = await ReportHour.findAll({
              where: {
                [Op.and]: [
                  { year: year },
                  { semester: Number(semester) },
                  { lecturerId: gvId }
                ]
              }
            })
        if (response2.length>0) {
          // update report hour
          await ReportHour.update({...response2[0].dataValues, ...response1[0].dataValues},{
            where: { id: response2[0].dataValues.id}
            })
        } else {
          // create report hour
          await ReportHour.create(response1[0].dataValues)
        }
      })
      // const updateHourSchedule = async () => {
      //   return await SubSubjectLecturer.findAll({
      //     where: {
      //       [Op.and]: [
      //         { year: year },
      //         { semester: Number(semester) },
      //         { lecturerId: gvId }
      //       ]
      //     },
      //     attributes: ['lecturerId', 'year', 'semester',[sequelize.fn('sum', sequelize.col('hour')), 'hourSchedule']],
      //   })}
      // updateHourSchedule().then(async (response1) => {
      //   const response2 = await ReportHour.findAll({
      //     where: {
      //       [Op.and]: [
      //         { year: year },
      //         { semester: Number(semester) },
      //         { lecturerId: gvId }
      //       ]
      //     }
      //   })
      //   console.log(response1,response2)
      //   if (response2.length>0) {
      //     // update report hour
      //     await ReportHour.update({...response2[0].dataValues, ...response1[0].dataValues},{
      //       where: { id: response2[0].dataValues.id}
      //       })
      //   } else {
      //     // create report hour
      //     await ReportHour.create(response1[0].dataValues)
      //   }
      // })

      break;

    case "kltn":
      const updateHourThesis = async () => {
        const response1 = await Thesis.findAll({
          where: {
            [Op.and]: [
              { year: year },
              { semester: Number(semester) },
              { lecturerId: gvId }
            ]
          },
          attributes: ['lecturerId', 'lecturerName','year', 'semester',[sequelize.fn('sum', sequelize.col('hour')), 'hourThesis']],
        })
        const response2 = await ReportHour.findAll({
          where: {
            [Op.and]: [
              { year: year },
              { semester: Number(semester) },
              { lecturerId: gvId }
            ]
          }
        })
        if (response2.length>0) {
          // update report hour
          await ReportHour.update( {...response2[0].dataValues, ...response1[0].dataValues},{
            where: { id: response2[0].dataValues.id}
          })
        } else {
          // create report hour
          await ReportHour.create(response1[0].dataValues)
        }
      }
      updateHourThesis()
      break;

    default:
      break;
  }
}

report.list = async (req, res) => {
  const year = req.query.year;
  const semester = req.query.semester;
  let response;
  if (Boolean(year) && Boolean(semester)) {
    response = await ReportHour.findAll({
      where: {
        [Op.and]: [
          { year: year },
          { semester: Number(semester) }
        ]
      }
    })
  } else {
    response = await ReportHour.findAll()
  }
  res.json(response);

}

module.exports = report;
