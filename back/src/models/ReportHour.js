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
    hourSchedule: { type: Sequelize.FLOAT, defaultValue: 0},
    hourThesis: { type: Sequelize.FLOAT, defaultValue: 0},
    hourProject: { type: Sequelize.FLOAT, defaultValue: 0},
    hourTTCN: { type: Sequelize.FLOAT, defaultValue: 0},
    total: { type: Sequelize.FLOAT, defaultValue: 0},
  },{
    timestamps: false
  });

  return ReportHour;
}
