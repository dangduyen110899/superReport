const db = require('../config/db');
const SubSubjectLecturer = db.subSubjectLecturer;
const sequelize = db.sequelize
const Thesis = db.thesis;
const Project = db.project;
const PhdThesis = db.phdThesis;
const Dissertation = db.dissertation;
const Consultant = db.consultant;
const Practice = db.practice;

const ReportHour = db.reportHour;
const Lecturer = db.lecturer;
const Quota = db.quota;
const report = {}
const excel = require("exceljs");

const { Op } = require("sequelize");

report.updateHour = async ( year, semester, name, gvId) => {
  switch (name) {
    // tkb đh
    case "tkb trong đh":

      const response1 = await SubSubjectLecturer.findAll({
        where: {
          [Op.and]: [
            { year: year },
            { semester: Number(semester) },
            { lecturerId: gvId },
            {program : 0}
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

      const response3 = await Lecturer.findAll({
        where: { id: gvId }
      })

      const response4 = await Quota.findAll({
        where: { position: response3[0].dataValues.position || 'GV' }
      })

      const rate = 270*(response4[0].dataValues.rate || 1)

      if (response2.length>0) {
        // update report hour
        const total = response2[0].dataValues.total + response1[0].dataValues.hourSchedule - response2[0].dataValues.hourSchedule
        await ReportHour.update({...response2[0].dataValues, ...response1[0].dataValues, total: total, rate: Math.round(total*10000/rate), quota: response4[0].dataValues.rate},{
          where: { id: response2[0].dataValues.id}
          })
      } else {
        // create report hour
        const dataGv = {
          department: response3[0].dataValues.department,
          email: response3[0].dataValues.email,
          name: response3[0].dataValues.name,
          programs: response3[0].dataValues.programs,
          status: response3[0].dataValues.status,
          subject: response3[0].dataValues.subject,
          đh : response3[0].dataValues.đh,
          sđh :  response3[0].dataValues.sđh
        }
        try {
          const total = response1[0].dataValues.hourSchedule
          await ReportHour.create({...response1[0].dataValues, ...dataGv, total: total, rate: Math.round(total*10000/rate), quota: response4[0].dataValues.rate})
        } catch (error) {
          console.log(error)
        }
      }
      break;

      // tkb sau đh
    case "tkb sau đh":

      const response10 = await SubSubjectLecturer.findAll({
        where: {
          [Op.and]: [
            { year: year },
            { semester: Number(semester) },
            { lecturerId: gvId },
            {program : 1}
          ]
        },
        attributes: ['lecturerId','lecturerName', 'year', 'semester',[sequelize.fn('sum', sequelize.col('hour')), 'hourScheduleAfter']],
      })
      const response20 = await ReportHour.findAll({
        where: {
          [Op.and]: [
            { year: year },
            { semester: Number(semester) },
            { lecturerId: gvId }
          ]
        }
      })

      const response30 = await Lecturer.findAll({
        where: { id: gvId }
      })

      const response40 = await Quota.findAll({
        where: { position: response30[0].dataValues.position || 'GV' }
      })

      const rate0 = 270*(response40[0].dataValues.rate || 1)

      if (response20.length>0) {
        // update report hour
        const total = response20[0].dataValues.total + response10[0].dataValues.hourScheduleAfter - response20[0].dataValues.hourScheduleAfter
        await ReportHour.update({...response20[0].dataValues, ...response10[0].dataValues, total: total, rate: Math.round(total*10000/rate0), quota: response40[0].dataValues.rate, sđh: 1},{
          where: { id: response20[0].dataValues.id}
          })
      } else {
        // create report hour
        const dataGv = {
          department: response30[0].dataValues.department,
          email: response30[0].dataValues.email,
          name: response30[0].dataValues.name,
          programs: response30[0].dataValues.programs,
          status: response30[0].dataValues.status,
          subject: response30[0].dataValues.subject,
          đh : response30[0].dataValues.đh,
          sđh :  1
        }
        try {
          const total = response10[0].dataValues.hourScheduleAfter
          await ReportHour.create({...response10[0].dataValues, ...dataGv, total: total, rate: Math.round(total*10000/rate0), quota: response40[0].dataValues.rate})
        } catch (error) {
          console.log(error)
        }
      }
      break;

      // kltn
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
        const response3 = await Lecturer.findAll({
          where: { id: gvId }
        })

        const response4 = await Quota.findAll({
          where: { position: response3[0].dataValues.position || 'GV' }
        })

        const rate = 270*(response4[0].dataValues.rate || 1)

        if (response2.length>0) {
          // update report hour
          const total = response2[0].dataValues.total  + response1[0].dataValues.hourThesis - response2[0].dataValues.hourThesis
          await ReportHour.update( {...response2[0].dataValues, ...response1[0].dataValues, total: total, rate: Math.round(total*10000/rate), quota: response4[0].dataValues.rate},{
            where: { id: response2[0].dataValues.id}
          })
        } else {
          // create report hour

          const dataGv = {
            department: response3[0].dataValues.department,
            email: response3[0].dataValues.email,
            name: response3[0].dataValues.name,
            programs: response3[0].dataValues.programs,
            status: response3[0].dataValues.status,
            subject: response3[0].dataValues.subject,
            đh : response3[0].dataValues.đh,
            sđh :  response3[0].dataValues.sđh
          }
          const total = response1[0].dataValues.hourThesis
          await ReportHour.create({...response1[0].dataValues, ...dataGv, total: total, rate: Math.round(total*10000/rate), quota: response4[0].dataValues.rate})
        }
      }
      updateHourThesis()
      break;

      case "datn":
      const updateHourProject = async () => {
        const response1 = await Project.findAll({
          where: {
            [Op.and]: [
              { year: year },
              { semester: Number(semester) },
              { lecturerId: gvId }
            ]
          },
          attributes: ['lecturerName','year', 'semester',[sequelize.fn('sum', sequelize.col('hour')), 'hourProject']],
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
        const response3 = await Lecturer.findAll({
          where: { id: gvId }
        })

        const response4 = await Quota.findAll({
          where: { position: response3[0].dataValues.position || 'GV' }
        })

        const rate = 270*(response4[0].dataValues.rate || 1)

        if (response2.length>0) {
          // update report hour
          const total = response2[0].dataValues.total  + response1[0].dataValues.hourProject - response2[0].dataValues.hourProject
          await ReportHour.update( {...response2[0].dataValues, ...response1[0].dataValues, total: total, rate: Math.round(total*10000/rate), quota: response4[0].dataValues.rate},{
            where: { id: response2[0].dataValues.id}
          })
        } else {
          // create report hour

          const dataGv = {
            department: response3[0].dataValues.department,
            email: response3[0].dataValues.email,
            name: response3[0].dataValues.name,
            programs: response3[0].dataValues.programs,
            status: response3[0].dataValues.status,
            subject: response3[0].dataValues.subject,
            đh : response3[0].dataValues.đh,
            sđh :  response3[0].dataValues.sđh
          }
          const total = response1[0].dataValues.hourProject
          await ReportHour.create({...response1[0].dataValues, ...dataGv, total: total, rate: Math.round(total*10000/rate), quota: response4[0].dataValues.rate})
        }
      }
      try {
        updateHourProject()
      } catch (error) {
        console.log(error)
      }
      break;

      case "lvts":
        const updateHourPhdThesis = async () => {
          const response1 = await PhdThesis.findAll({
            where: {
              [Op.and]: [
                { year: year },
                { semester: Number(semester) },
                { lecturerId: gvId }
              ]
            },
            attributes: ['lecturerName','year', 'semester',[sequelize.fn('sum', sequelize.col('hour')), 'hourPhdThesis']],
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
          const response3 = await Lecturer.findAll({
            where: { id: gvId }
          })
  
          const response4 = await Quota.findAll({
            where: { position: response3[0].dataValues.position || 'GV' }
          })
  
          const rate = 270*(response4[0].dataValues.rate || 1)
  
          if (response2.length>0) {
            // update report hour
            const total = response2[0].dataValues.total  + response1[0].dataValues.hourPhdThesis - response2[0].dataValues.hourPhdThesis
            await ReportHour.update( {...response2[0].dataValues, ...response1[0].dataValues, total: total, rate: Math.round(total*10000/rate), quota: response4[0].dataValues.rate},{
              where: { id: response2[0].dataValues.id}
            })
          } else {
            // create report hour
  
            const dataGv = {
              department: response3[0].dataValues.department,
              email: response3[0].dataValues.email,
              name: response3[0].dataValues.name,
              programs: response3[0].dataValues.programs,
              status: response3[0].dataValues.status,
              subject: response3[0].dataValues.subject,
              đh : response3[0].dataValues.đh,
              sđh :  response3[0].dataValues.sđh
            }
            const total = response1[0].dataValues.hourPhdThesis
            await ReportHour.create({...response1[0].dataValues, ...dataGv, total: total, rate: Math.round(total*10000/rate), quota: response4[0].dataValues.rate})
          }
        }
        try {
          updateHourPhdThesis()
        } catch (error) {
          console.log(error)
        }
      break;
    
      case "lats":
        const updateHourDissertation = async () => {
          const response1 = await Dissertation.findAll({
            where: {
              [Op.and]: [
                { year: year },
                { semester: Number(semester) },
                { lecturerId: gvId }
              ]
            },
            attributes: ['lecturerName','year', 'semester',[sequelize.fn('sum', sequelize.col('hour')), 'hourDissertation']],
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
          const response3 = await Lecturer.findAll({
            where: { id: gvId }
          })
  
          const response4 = await Quota.findAll({
            where: { position: response3[0].dataValues.position || 'GV' }
          })
  
          const rate = 270*(response4[0].dataValues.rate || 1)
  
          if (response2.length>0) {
            // update report hour
            const total = response2[0].dataValues.total  + response1[0].dataValues.hourDissertation - response2[0].dataValues.hourDissertation
            await ReportHour.update( {...response2[0].dataValues, ...response1[0].dataValues, total: total, rate: Math.round(total*10000/rate), quota: response4[0].dataValues.rate},{
              where: { id: response2[0].dataValues.id}
            })
          } else {
            // create report hour
  
            const dataGv = {
              department: response3[0].dataValues.department,
              email: response3[0].dataValues.email,
              name: response3[0].dataValues.name,
              programs: response3[0].dataValues.programs,
              status: response3[0].dataValues.status,
              subject: response3[0].dataValues.subject,
              đh : response3[0].dataValues.đh,
              sđh :  response3[0].dataValues.sđh
            }
            const total = response1[0].dataValues.hourDissertation
            await ReportHour.create({...response1[0].dataValues, ...dataGv, total: total, rate: Math.round(total*10000/rate), quota: response4[0].dataValues.rate})
          }
        }
        try {
          updateHourDissertation()
        } catch (error) {
          console.log(error)
        }
      break;
      
      case "cvht":
        const updateConsultant = async () => {
          const response1 = await Consultant.findAll({
            where: {
              [Op.and]: [
                { year: year },
                { semester: Number(semester) },
                { lecturerId: gvId }
              ]
            },
            attributes: ['lecturerName','year', 'semester',[sequelize.fn('sum', sequelize.col('hour')), 'hourConsultant']],
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
          const response3 = await Lecturer.findAll({
            where: { id: gvId }
          })
  
          const response4 = await Quota.findAll({
            where: { position: response3[0].dataValues.position || 'GV' }
          })
  
          const rate = 270*(response4[0].dataValues.rate || 1)
  
          if (response2.length>0) {
            // update report hour
            const total = response2[0].dataValues.total  + response1[0].dataValues.hourConsultant - response2[0].dataValues.hourConsultant
            await ReportHour.update( {...response2[0].dataValues, ...response1[0].dataValues, total: total, rate: Math.round(total*10000/rate), quota: response4[0].dataValues.rate},{
              where: { id: response2[0].dataValues.id}
            })
          } else {
            // create report hour
  
            const dataGv = {
              department: response3[0].dataValues.department,
              email: response3[0].dataValues.email,
              name: response3[0].dataValues.name,
              programs: response3[0].dataValues.programs,
              status: response3[0].dataValues.status,
              subject: response3[0].dataValues.subject,
              đh : response3[0].dataValues.đh,
              sđh :  response3[0].dataValues.sđh
            }
            const total = response1[0].dataValues.hourConsultant
            await ReportHour.create({...response1[0].dataValues, ...dataGv, total: total, rate: Math.round(total*10000/rate), quota: response4[0].dataValues.rate})
          }
        }
        try {
          updateConsultant()
        } catch (error) {
          console.log(error)
        }
      break;

    
      case "tttd":
        const updatePractice = async () => {
          const response1 = await Practice.findAll({
            where: {
              [Op.and]: [
                { year: year },
                { semester: Number(semester) },
                { lecturerId: gvId }
              ]
            },
            attributes: ['lecturerName','year', 'semester',[sequelize.fn('sum', sequelize.col('hour')), 'hourPractice']],
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
          const response3 = await Lecturer.findAll({
            where: { id: gvId }
          })
  
          const response4 = await Quota.findAll({
            where: { position: response3[0].dataValues.position || 'GV' }
          })
  
          const rate = 270*(response4[0].dataValues.rate || 1)
  
          if (response2.length>0) {
            // update report hour
            const total = response2[0].dataValues.total  + response1[0].dataValues.hourPractice - response2[0].dataValues.hourPractice
            await ReportHour.update( {...response2[0].dataValues, ...response1[0].dataValues, total: total, rate: Math.round(total*10000/rate), quota: response4[0].dataValues.rate},{
              where: { id: response2[0].dataValues.id}
            })
          } else {
            // create report hour
  
            const dataGv = {
              department: response3[0].dataValues.department,
              email: response3[0].dataValues.email,
              name: response3[0].dataValues.name,
              programs: response3[0].dataValues.programs,
              status: response3[0].dataValues.status,
              subject: response3[0].dataValues.subject,
              đh : response3[0].dataValues.đh,
              sđh :  response3[0].dataValues.sđh
            }
            const total = response1[0].dataValues.hourPractice
            await ReportHour.create({...response1[0].dataValues, ...dataGv, total: total, rate: Math.round(total*10000/rate), quota: response4[0].dataValues.rate})
          }
        }
        try {
          updatePractice()
        } catch (error) {
          console.log(error)
        }
      break;
  
    }
}


report.list = async (req, res) => {

    // get department or Subject user
    async function getDepartmentUser(name) {
      const infor = await Lecturer.findAll({
        where: { email:  req.user.email}
      })
      if(name==='LĐK') {
        return infor[0].dataValues.department
      } else if (name==='LĐBM') {
        return infor[0].dataValues.subject
      } else {
        return infor[0].dataValues.name
      }
    }

    // get year next 
    function nextYear(year) {
      const temp = year.slice(0,4)
      const ntYear = Number(temp) + 1
      return `${ntYear}-${ntYear+1}` 
    }

    // some proper
    const year = req.query.year;
    const semester = req.query.semester;
    const page = req.query.check=='export' ? 1 : Number(req.query.page) || 1;
    const size = req.query.check=='export' ? 100000000000 : Number(req.query.size) || 10;
    const type = Number(req.query.type) || 0;
  
    const bomon = req.query.valuefilter2
    const khoa= req.query.valuefilter1
    const arrBomon = bomon && bomon.split(',') || []
    const  arrKhoa = khoa && khoa.split(',') || []
    const keyword = req.query.keyword || '';
    let sort = req.query.sort=='tang' ? 'ASC' : 'DESC';
    const sortField = req.query.sortField ? req.query.sortField : 'id' ;
    if (sortField==='id') {
      sort = 'ASC'
    }

    let response1;
    let count1;
  
    // check field filter khoa hoac bo mon
    let condition = []
    // check dai hoc hay sau dai hoc
    let checkAdmin = []

    switch (req.user.role) {
      case 'ADMIN':
        // gv day trong dh
        checkAdmin.push({đh: 1})
        break;
      case 'ADMIN1':
        // gv day sau dh
        checkAdmin.push({sđh: 1})
        break;
      case 'LĐK':
        arrKhoa = [getDepartmentUser('LĐK')]
        arrBomon = []
        break;
      case 'LĐBM':
        arrKhoa = []
        arrBomon = [getDepartmentUser('LĐBM')]
        break;
      case 'USER':
        keyword = getDepartmentUser('GV')
        arrBomon = []
        arrKhoa = []
        break;
      default:
        break;
    }
  
    // add filter khoa and bo mon
    if (arrKhoa.length>0) {
      arrKhoa.forEach(item => {
        condition.push({
          'department': item
        })
      })
    }
  
    if (arrBomon.length>0) {
      arrBomon.forEach(item => {
        condition.push({
          'subject': item
        })
      })
    }
  
    // check hoc ky trong nam hoc
    if (Boolean(year) && Boolean(semester) && type===0) {
      const conbo = [{ year: year },{ semester: Number(semester) }, {lecturerName: {[Op.like]: `%${keyword}%`}}]
      if (req.user.role==='ADMIN' || req.user.role==='ADMIN1' ) {
        conbo.push(...checkAdmin)
      }

      const conditions = condition.length>0 ?  { [Op.and]: conbo, [Op.or] : condition} : {[Op.and]: conbo}
      console.log("xX", conditions)
      const { count, rows } = await ReportHour.findAndCountAll({
        where: conditions,
        offset: Number((page-1)*size), 
        limit: Number(size),
        attributes: { exclude: ['đt', 'sđt'] },
        order: [
          [sortField, sort]
      ],
      })
      response1 = rows
      count1 = count

      // check nam hoc
    } else if (Boolean(year) && Boolean(semester) && type===1) {
      const conbo = [{ year: year },{lecturerName: {[Op.like]: `%${keyword}%`}}]
  
      if (req.user.role==='ADMIN' || req.user.role==='ADMIN1' ) {
        conbo.push(...checkAdmin)
      }
          
      const conditions = condition.length>0 ? {[Op.and]: conbo, [Op.or] : condition} : {[Op.and]: conbo}
      const { count, rows } = await ReportHour.findAndCountAll({
        where: conditions,
        offset: Number((page-1)*size), 
        limit: Number(size),
        attributes: ['year', 'lecturerId', 
        [sequelize.fn('sum', sequelize.col('hourSchedule')), 'hourSchedule'],
        [sequelize.fn('sum', sequelize.col('hourScheduleAfter')), 'hourScheduleAfter'],
        [sequelize.fn('sum', sequelize.col('hourThesis')), 'hourThesis'],
        [sequelize.fn('sum', sequelize.col('hourProject')), 'hourProject'],
        [sequelize.fn('sum', sequelize.col('hourPhdThesis')), 'hourPhdThesis'],
        [sequelize.fn('sum', sequelize.col('hourDissertation')), 'hourDissertation'],
        [sequelize.fn('sum', sequelize.col('hourConsultant')), 'hourConsultant'],
        [sequelize.fn('sum', sequelize.col('hourPractice')), 'hourPractice'],
        [sequelize.fn('sum', sequelize.col('rate')), 'rate'],
        [sequelize.fn('sum', sequelize.col('total')), 'total'],'lecturerId','lecturerName','department','programs','subject','quota'],
        group : ['year', 'lecturerId']
      })
      response1 = rows
      count1 = count
    } else if (Boolean(year) && Boolean(semester) && type===2) {
      const conbo = [{ year: year, semester: 2},
      { year: nextYear(year), semester: 1 }]

      const conditions = condition.length>0 ? {[Op.or] : condition, [Op.or] : conbo} : {[Op.or]: conbo}
      const { count, rows } = await ReportHour.findAndCountAll({
        where:  { lecturerName: {[Op.like]: `%${keyword}%`}, conditions } ,
        offset: Number((page-1)*size), 
        limit: Number(size),
        attributes: ['year', 'lecturerId', 
        [sequelize.fn('sum', sequelize.col('hourSchedule')), 'hourSchedule'],
        [sequelize.fn('sum', sequelize.col('hourScheduleAfter')), 'hourScheduleAfter'],
        [sequelize.fn('sum', sequelize.col('hourThesis')), 'hourThesis'],
        [sequelize.fn('sum', sequelize.col('hourProject')), 'hourProject'],
        [sequelize.fn('sum', sequelize.col('hourPhdThesis')), 'hourPhdThesis'],
        [sequelize.fn('sum', sequelize.col('hourDissertation')), 'hourDissertation'],
        [sequelize.fn('sum', sequelize.col('hourConsultant')), 'hourConsultant'],
        [sequelize.fn('sum', sequelize.col('hourPractice')), 'hourPractice'],
        [sequelize.fn('sum', sequelize.col('rate')), 'rate'],
        [sequelize.fn('sum', sequelize.col('total')), 'total'],'lecturerId','lecturerName','department','programs','subject','quota'],
        group : ['lecturerId']
      })
      response1 = rows
      count1 = count
    } else {
      console.log(checkAdmin)
      const { count, rows } = await ReportHour.findAndCountAll({
        where: {...checkAdmin[0]},
        attributes: { exclude: ['đt', 'sđt'] },
      })
      response1 = rows
      count1 = count
    }
    if (req.query.check == 'export') {
      console.log("Fff")
      exportFile(response1, res)
    } else {
      res.json({data: response1, total: count1})
    }
  }
  
function exportFile(response1, res) {
  let tutorials = []
  let header = []

  response1.forEach((item) => {
    tutorials.push(item.dataValues);
  });

  function getTitle(key) {
    switch (key) {
      case 'id':
        return 'ID'
        break;
      
      case 'year':
        return 'Năm học'
        break;

      case 'semester':
        return ' Học kỳ'
        break;

      case 'lecturerName':
        return 'Giảng viên'
        break;

      case 'department':
        return 'Khoa'
        break;

      case 'subject':
        return 'Bộ môn'
        break;
      
      case 'hourSchedule':
        return 'Giờ dạy trong đại học'
        break;
      
      case 'hourScheduleAfter':
        return 'Giờ dạy sau đại học'
        break;

      case 'hourThesis':
      return 'Giờ hướng dẫn khóa luận tốt nghiệp'
      break;

      case 'hourProject':
      return 'Giờ hướng dẫn đồ án tốt nghiệp'
      break;

      case 'hourPhdThesis':
      return 'Giờ hướng dẫn luận văn thạc sĩ'
      break;

      case 'hourDissertation':
      return 'Giờ hướng dẫn luận án tiến sĩ'
      break;

      case 'hourConsultant':
      return 'Giờ hướng dẫn cố vấn học tập'
      break;

      case 'hourPractice':
      return 'Giờ hướng dẫn thực tập thực địa'
      break;

      case 'total':
      return 'Tổng số giờ'
      break;

      case 'rate':
      return 'Tỷ lệ'
      break;

      case 'quota':
      return 'Định mức'
      break;

      default:
        break;
    }
  }

  for (const [key, value] of Object.entries(tutorials[0])) {
    header.push( { header: getTitle(`${key}`), key: `${key}`})
  }

  let workbook = new excel.Workbook();
  let worksheet = workbook.addWorksheet("Report");


  worksheet.columns = header
  // Add Array Rows
  worksheet.addRows(tutorials);

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + "tutorials.xlsx"
  );

  return workbook.xlsx.write(res).then(function () {
    res.status(200).end();
  });
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
      [sequelize.fn('sum', sequelize.col('hourPhdThesis')), 'hourPhdThesis'],
      [sequelize.fn('sum', sequelize.col('rate')), 'rate'],
      [sequelize.fn('sum', sequelize.col('total')), 'total'],'lecturerId','lecturerName','department','programs','subject','quota'],
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
      [sequelize.fn('sum', sequelize.col('hourPhdThesis')), 'hourPhdThesis'],
      [sequelize.fn('sum', sequelize.col('rate')), 'rate'],
      [sequelize.fn('sum', sequelize.col('total')), 'total'],'lecturerId','lecturerName','department','programs','subject','quota'],
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
