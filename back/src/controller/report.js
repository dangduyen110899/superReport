const db = require('../config/db');
const SubSubjectLecturer = db.subSubjectLecturer;
const sequelize = db.sequelize
const Thesis = db.thesis;
const ReportHour = db.reportHour;
const Lecturer = db.lecturer;
const report = {}

const { Op } = require("sequelize");

report.updateHour = async ( year, semester, name, gvId) => {
  switch (name) {
    case "tkb":

      const response1 = await SubSubjectLecturer.findAll({
        where: {
          [Op.and]: [
            { year: year },
            { semester: Number(semester) },
            { lecturerId: gvId }
          ]
        },
        attributes: ['lecturerId','lecturerName', 'year', 'semester',[sequelize.fn('sum', sequelize.col('hour')), 'hourSchedule']],
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
        const total = response2[0].dataValues.total + response1[0].dataValues.hourSchedule - response2[0].dataValues.hourSchedule
        await ReportHour.update({...response2[0].dataValues, ...response1[0].dataValues, total: total},{
          where: { id: response2[0].dataValues.id}
          })
      } else {
        // create report hour
        const response3 = await Lecturer.findAll({
          where: { id: gvId }
        })

        const dataGv = {
          department: response3[0].dataValues.department,
          email: response3[0].dataValues.email,
          name: response3[0].dataValues.name,
          programs: response3[0].dataValues.programs,
          status: response3[0].dataValues.status,
          subject: response3[0].dataValues.subject
        }
        try {
          const total = response1[0].dataValues.hourSchedule
          await ReportHour.create({...response1[0].dataValues, ...dataGv, total: total})
        } catch (error) {
          console.log(error)
        }
      }
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
          const total = response2[0].dataValues.total  + response1[0].dataValues.hourThesis - response2[0].dataValues.hourThesis
          await ReportHour.update( {...response2[0].dataValues, ...response1[0].dataValues, total: total},{
            where: { id: response2[0].dataValues.id}
          })
        } else {
          // create report hour
          const response3 = await Lecturer.findAll({
            where: { id: gvId }
          })

          const dataGv = {
            department: response3[0].dataValues.department,
            email: response3[0].dataValues.email,
            name: response3[0].dataValues.name,
            programs: response3[0].dataValues.programs,
            status: response3[0].dataValues.status,
            subject: response3[0].dataValues.subject
          }
          const total = response1[0].dataValues.hourThesis
          await ReportHour.create({...response1[0].dataValues, ...dataGv, total: total})
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
  const page = Number(req.query.page);
  const size = Number(req.query.size);
  const type = Number(req.query.type);
  let response1;
  let count1;

  function nextYear(year) {
    const temp = year.slice(0,4)
    console.log(temp)
    const ntYear = Number(temp) + 1
    return `${ntYear}-${ntYear+1}` 
  }

  if (Boolean(year) && Boolean(semester) && type===0) {
    const { count, rows } = await ReportHour.findAndCountAll({
      where: {
        [Op.and]: [
          { year: year },
          { semester: Number(semester) }
        ]
      },
      offset: Number((page-1)*size), 
      limit: Number(size)
    })
    response1 = rows
    count1 = count
  } else if (Boolean(year) && Boolean(semester) && type===1) {
    const { count, rows } = await ReportHour.findAndCountAll({
      where:  { year: year },
      offset: Number((page-1)*size), 
      limit: Number(size),
      attributes: ['year', 'lecturerId', 
      [sequelize.fn('sum', sequelize.col('hourSchedule')), 'hourSchedule'],
      [sequelize.fn('sum', sequelize.col('hourThesis')), 'hourThesis'],
      [sequelize.fn('sum', sequelize.col('hourProject')), 'hourProject'],
      [sequelize.fn('sum', sequelize.col('hourTTCN')), 'hourTTCN'],
      [sequelize.fn('sum', sequelize.col('total')), 'total'],'lecturerId','lecturerName','department','programs','subject'],
      group : ['year', 'lecturerId']
    })
    response1 = rows
    count1 = count
  } else if (Boolean(year) && Boolean(semester) && type===2) {
    const { count, rows } = await ReportHour.findAndCountAll({
      where:  { 
        [Op.or]: [
          { year: year, semester: 2},
          { year: nextYear(year), semester: 1 }
        ]
       },
      offset: Number((page-1)*size), 
      limit: Number(size),
      attributes: ['year', 'lecturerId', 
      [sequelize.fn('sum', sequelize.col('hourSchedule')), 'hourSchedule'],
      [sequelize.fn('sum', sequelize.col('hourThesis')), 'hourThesis'],
      [sequelize.fn('sum', sequelize.col('hourProject')), 'hourProject'],
      [sequelize.fn('sum', sequelize.col('hourTTCN')), 'hourTTCN'],
      [sequelize.fn('sum', sequelize.col('total')), 'total'],'lecturerId','lecturerName','department','programs','subject'],
      group : ['lecturerId']
    })
    response1 = rows
    count1 = count
  } else {
    const { count, rows } = await ReportHour.findAndCountAll()
    response1 = rows
    count1 = count
  }
  res.json({data: response1, total: count1});

}

report.listIdlecturer = async (req, res) => {
  const year = req.query.year;
  const semester = req.query.semester;
  const page = Number(req.query.page);
  const size = Number(req.query.size);
  const type = Number(req.query.type);
  const emailLecturer = req.emailLecturer
  const gv = await Lecturer.findAll({where: {email: emailLecturer}})
  const gvId = gv[0].dataValues.id
  let response1;
  let count1;

  function nextYear(year) {
    const temp = year.slice(0,4)
    console.log(temp)
    const ntYear = Number(temp) + 1
    return `${ntYear}-${ntYear+1}` 
  }

  if (Boolean(year) && Boolean(semester) && type===0) {
    const { count, rows } = await ReportHour.findAndCountAll({
      where: {
        lecturerId: gvId,
        [Op.and]: [
          { year: year },
          { semester: Number(semester) }
        ]
      },
      offset: Number((page-1)*size), 
      limit: Number(size)
    })
    response1 = rows
    count1 = count
  } else if (Boolean(year) && Boolean(semester) && type===1) {
    const { count, rows } = await ReportHour.findAndCountAll({
      where:  { year: year, lecturerId: gvId},
      offset: Number((page-1)*size), 
      limit: Number(size),
      attributes: ['year', 'lecturerId', 
      [sequelize.fn('sum', sequelize.col('hourSchedule')), 'hourSchedule'],
      [sequelize.fn('sum', sequelize.col('hourThesis')), 'hourThesis'],
      [sequelize.fn('sum', sequelize.col('hourProject')), 'hourProject'],
      [sequelize.fn('sum', sequelize.col('hourTTCN')), 'hourTTCN'],
      [sequelize.fn('sum', sequelize.col('total')), 'total'],'lecturerId','lecturerName','department','programs','subject'],
      group : ['year', 'lecturerId']
    })
    response1 = rows
    count1 = count
  } else if (Boolean(year) && Boolean(semester) && type===2) {
    const { count, rows } = await ReportHour.findAndCountAll({
      where:  { 
        lecturerId: gvId,
        [Op.or]: [
          { year: year, semester: 2},
          { year: nextYear(year), semester: 1 }
        ]
       },
      offset: Number((page-1)*size), 
      limit: Number(size),
      attributes: ['year', 'lecturerId', 
      [sequelize.fn('sum', sequelize.col('hourSchedule')), 'hourSchedule'],
      [sequelize.fn('sum', sequelize.col('hourThesis')), 'hourThesis'],
      [sequelize.fn('sum', sequelize.col('hourProject')), 'hourProject'],
      [sequelize.fn('sum', sequelize.col('hourTTCN')), 'hourTTCN'],
      [sequelize.fn('sum', sequelize.col('total')), 'total'],'lecturerId','lecturerName','department','programs','subject'],
      group : ['lecturerId']
    })
    response1 = rows
    count1 = count
  } else {
    const { count, rows } = await ReportHour.findAndCountAll({where: {
      lecturerId: gvId}})
    response1 = rows
    count1 = count
  }
  res.json({data: response1, total: count1});

}
module.exports = report;
