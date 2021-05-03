const db = require('../config/db');
const SubSubjectLecturer = db.subSubjectLecturer;
const sequelize = db.sequelize
const Thesis = db.thesis;
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
        await ReportHour.update({...response20[0].dataValues, ...response10[0].dataValues, total: total, rate: Math.round(total*10000/rate0), quota: response40[0].dataValues.rate},{
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
          sđh :  response30[0].dataValues.sđh
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

    default:
      break;
  }
}

report.list = async (req, res) => {
  console.log(req.user)
  async function getDepartmentUser(name) {
    const response3 = await Lecturer.findAll({
      where: { email:  req.user.email}
    })
    if(name==='LĐK') {
      console.log(response3[0].dataValues.department)
      return response3[0].dataValues.department
    } else {
      console.log(response3[0].dataValues.subject)
      return response3[0].dataValues.subject
    }
  }
  const keyword = req.query.keyword || '';
  const year = req.query.year;
  // khoa
  const valuefilter2= req.query.valuefilter2   
  // bộ môn
  const valuefilter1 = req.query.valuefilter1
  const semester = req.query.semester;
  const page = Number(req.query.page);
  const size = Number(req.query.size);
  const type = Number(req.query.type);
  function nextYear(year) {
    const temp = year.slice(0,4)
    const ntYear = Number(temp) + 1
    return `${ntYear}-${ntYear+1}` 
  }
  // sort
  let sort = req.query.sort=='tang' ? 'ASC' : 'DESC';
  const sortField = req.query.sortField ? req.query.sortField : 'id' ;
  if (sortField==='id') {
    sort = 'ASC'
  }
  let response1;
  let count1;

  // check field filter
  let condition = []
  const arrFitlerDepartment1 = valuefilter1 && valuefilter1.split(',') || []
  const arrFitlerDepartment2 = valuefilter2 && valuefilter2.split(',') || []

  let condition1 = []
  // check role
  switch (req.user.role) {
    case 'ADMIN':
      // gv day trong dh
      condition1.push({đh: 1})
      break;
    case 'ADMIN1':
      // gv day sau dh
      condition1.push({sđh: 1})
      break;
    case 'LĐK':
      arrFitlerDepartment2 = [getDepartmentUser('LĐK')]
      break;
    case 'LĐBM':
      arrFitlerDepartment2 = []
      arrFitlerDepartment1 = [getDepartmentUser('LĐBM')]
      break;
    case 'USER':
      arrFitlerDepartment2 = []
      arrFitlerDepartment1 = []
      break;
    default:
      break;
  }


  if (arrFitlerDepartment1.length>0) {
    arrFitlerDepartment1.forEach(item => {
      condition.push({
        'department': item
      })
    })
  }

  if (arrFitlerDepartment2.length>0) {
    arrFitlerDepartment2.forEach(item => {
      condition.push({
        'subject': item
      })
    })
  }

  if (Boolean(year) && Boolean(semester) && type===0) {

    const conbo = [{ year: year },
      { semester: Number(semester) }, {lecturerName: {[Op.like]: `%${keyword}%`}}]
    if (req.user.role==='ADMIN' || req.user.role==='ADMIN1' ) {
      conbo.push(...condition1)
    }
    console.log(conbo)
    const conditions = condition.length>0 ? {[Op.and]: conbo, [Op.or] : condition} : {[Op.and]: conbo}
    const { count, rows } = await ReportHour.findAndCountAll({
      where: conditions,
      offset: Number((page-1)*size), 
      limit: Number(size),
      order: [
        [sortField, sort]
    ],
    })
    response1 = rows
    count1 = count
  } else if (Boolean(year) && Boolean(semester) && type===1) {
    const conbo = [{ year: year },{lecturerName: {[Op.like]: `%${keyword}%`}}]

    if (req.user.role==='ADMIN' || req.user.role==='ADMIN1' ) {
      conbo.push(...condition1)
    }
        
    const conditions = condition.length>0 ? {[Op.and]: conbo, [Op.or] : condition} : {[Op.and]: conbo}
    const { count, rows } = await ReportHour.findAndCountAll({
      where: conditions,
      offset: Number((page-1)*size), 
      limit: Number(size),
      attributes: ['year', 'lecturerId', 
      [sequelize.fn('sum', sequelize.col('hourSchedule')), 'hourSchedule'],
      [sequelize.fn('sum', sequelize.col('hourThesis')), 'hourThesis'],
      [sequelize.fn('sum', sequelize.col('hourProject')), 'hourProject'],
      [sequelize.fn('sum', sequelize.col('hourTTCN')), 'hourTTCN'],
      [sequelize.fn('sum', sequelize.col('rate')), 'rate'],
      [sequelize.fn('sum', sequelize.col('total')), 'total'],'lecturerId','lecturerName','department','programs','subject','quota'],
      group : ['year', 'lecturerId']
    })
    response1 = rows
    count1 = count
  } else if (Boolean(year) && Boolean(semester) && type===2) {
    const conbo = [
      { year: year, semester: 2},
          { year: nextYear(year), semester: 1 }
    ]
    const conditions = condition.length>0 ? {[Op.or] : [...condition, ...conbo]} : {[Op.or]: conbo}
    const { count, rows } = await ReportHour.findAndCountAll({
      where:  { lecturerName: {[Op.like]: `%${keyword}%`}, conditions } ,
      offset: Number((page-1)*size), 
      limit: Number(size),
      attributes: ['year', 'lecturerId', 
      [sequelize.fn('sum', sequelize.col('hourSchedule')), 'hourSchedule'],
      [sequelize.fn('sum', sequelize.col('hourThesis')), 'hourThesis'],
      [sequelize.fn('sum', sequelize.col('hourProject')), 'hourProject'],
      [sequelize.fn('sum', sequelize.col('hourTTCN')), 'hourTTCN'],
      [sequelize.fn('sum', sequelize.col('rate')), 'rate'],
      [sequelize.fn('sum', sequelize.col('total')), 'total'],'lecturerId','lecturerName','department','programs','subject','quota'],
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
      [sequelize.fn('sum', sequelize.col('hourTTCN')), 'hourTTCN'],
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

report.export = async (req, res) => {
  const valuefilter2= req.body.valuefilter2
  const valuefilter1 = req.body.valuefilter1
  const keyword = req.body.keyword || ''

  // check field filter
  let condition = []
  const arrFitlerDepartment1 = valuefilter1 
  // && valuefilter1.split(',') || []
  const arrFitlerDepartment2 = valuefilter2
  //  && valuefilter2.split(',') || []

  if (arrFitlerDepartment1.length>0) {
    arrFitlerDepartment1.forEach(item => {
      condition.push({
        'department': item
      })
    })
  }

  if (arrFitlerDepartment2.length>0) {
    arrFitlerDepartment2.forEach(item => {
      condition.push({
        'subject': item
      })
    })
  }

  const year = req.body.year;
  const semester = req.body.semester;
  const type = Number(req.body.type);
  let sort = req.body.sort=='tang' ? 'ASC' : 'DESC';
  const sortField = req.body.sortField ? req.body.sortField : 'id' ;
  if (sortField==='id') {
    sort = 'ASC'
  }
  let response1;
  let count1;

  function nextYear(year) {
    const temp = year.slice(0,4)
    const ntYear = Number(temp) + 1
    return `${ntYear}-${ntYear+1}` 
  }

  if (Boolean(year) && Boolean(semester) && type===0) {
    const conbo = {
      [Op.and]: [{ year: year },
        { semester: Number(semester) }, { lecturerName: {[Op.like]: `%${keyword}%`} }]
    }
    const conditions = condition.length>0 ? {...conbo, [Op.or] : condition} : conbo
    const { count, rows } = await ReportHour.findAndCountAll({
      where: conditions,
      attributes: ["lecturerName","department","subject","hourThesis","hourSchedule","hourProject","hourTTCN","total"],
      order: [
        [sortField, sort]
    ],
    })
    response1 = rows
    count1 = count
  } else if (Boolean(year) && Boolean(semester) && type===1) {
    const conbo = {
      [Op.and]: [{ year: year }, {lecturerName: {[Op.like]: `%${keyword}%`}}]
    }
    const conditions = condition.length>0 ? {...conbo, [Op.or] : condition} : conbo
    const { count, rows } = await ReportHour.findAndCountAll({
      where:  conditions,
      attributes: ['lecturerName','department','programs','subject',
      [sequelize.fn('sum', sequelize.col('hourSchedule')), 'hourSchedule'],
      [sequelize.fn('sum', sequelize.col('hourThesis')), 'hourThesis'],
      [sequelize.fn('sum', sequelize.col('hourProject')), 'hourProject'],
      [sequelize.fn('sum', sequelize.col('hourTTCN')), 'hourTTCN'],
      [sequelize.fn('sum', sequelize.col('total')), 'total'],
      'quota',
      [sequelize.fn('sum', sequelize.col('rate')), 'rate']],
      group : ['year', 'lecturerId']
    })
    response1 = rows
    count1 = count
  } else if (Boolean(year) && Boolean(semester) && type===2) {
    const conbo = [
      { year: year, semester: 2},
          { year: nextYear(year), semester: 1 }
    ]
    const conditions = condition.length>0 ? {[Op.or] : [...condition, ...conbo]} : {[Op.or]: conbo}
    const { count, rows } = await ReportHour.findAndCountAll({
      where:  { lecturerName: {[Op.like]: `%${keyword}%`}, conditions },
      attributes: ['lecturerName','department','programs','subject',
      [sequelize.fn('sum', sequelize.col('hourSchedule')), 'hourSchedule'],
      [sequelize.fn('sum', sequelize.col('hourThesis')), 'hourThesis'],
      [sequelize.fn('sum', sequelize.col('hourProject')), 'hourProject'],
      [sequelize.fn('sum', sequelize.col('hourTTCN')), 'hourTTCN'],
      [sequelize.fn('sum', sequelize.col('total')), 'total'],
      'quota',
      [sequelize.fn('sum', sequelize.col('rate')), 'rate']],
      group : ['lecturerId']
    })
    response1 = rows
    count1 = count
  } else {
    console.log("xxx2")
    const { count, rows } = await ReportHour.findAndCountAll()
    response1 = rows
    count1 = count
  }

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
          return 'Giờ dạy trên lớp'
          break;

          case 'hourThesis':
        return 'HD khóa luận'
        break;

        case 'hourProject':
        return 'HD đồ án '
        break;

        case 'hourTTCN':
        return 'HD thực tập'
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


        case 'id':
        return 'ID'
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
};

module.exports = report;
