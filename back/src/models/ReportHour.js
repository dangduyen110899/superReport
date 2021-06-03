module.exports = (sequelize, Sequelize) => {

  var ReportHour = sequelize.define('reportHour', {
    lecturerName: Sequelize.STRING,
    department: Sequelize.STRING,
    subject: Sequelize.STRING,
    hourSchedule: { type: Sequelize.FLOAT, defaultValue: 0},
    hourScheduleAfter: { type: Sequelize.FLOAT, defaultValue: 0},
    hourThesis: { type: Sequelize.FLOAT, defaultValue: 0},
    hourProject: { type: Sequelize.FLOAT, defaultValue: 0},
    hourPhdThesis: { type: Sequelize.FLOAT, defaultValue: 0},
    hourPractice: { type: Sequelize.FLOAT, defaultValue: 0},
    hourDissertation: { type: Sequelize.FLOAT, defaultValue: 0},
    hourConsultant: { type: Sequelize.FLOAT, defaultValue: 0},
    total: { type: Sequelize.FLOAT, defaultValue: 0},
    rate: { type: Sequelize.FLOAT, defaultValue: 0},
    quota: { type: Sequelize.FLOAT, defaultValue: 0},
    đh: { type: Sequelize.FLOAT, defaultValue: 0},
    sđh: { type: Sequelize.FLOAT, defaultValue: 0},
    programs: Sequelize.STRING,
    lecturerId: Sequelize.INTEGER,
    year: Sequelize.STRING,
    semester: Sequelize.INTEGER,
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  },{
    timestamps: false
  });

  return ReportHour;
}
