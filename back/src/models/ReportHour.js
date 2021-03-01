module.exports = (sequelize, Sequelize) => {

  var ReportHour = sequelize.define('reportHour', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    year: Sequelize.STRING,
    semester: Sequelize.INTEGER,
    lecturerId: Sequelize.INTEGER,
    lecturerName: Sequelize.STRING,
    hourSchedule: Sequelize.FLOAT,
    hourThesis: Sequelize.FLOAT,
    hourProject: Sequelize.FLOAT,
    hourTTCN: Sequelize.FLOAT,
    total: Sequelize.FLOAT,
  },{
    timestamps: false
  });

  return ReportHour;
}
