// luận văn
module.exports = (sequelize, Sequelize) => {

  var Dissertation = sequelize.define('dissertation', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameDissertation: Sequelize.STRING,
    semester: Sequelize.INTEGER,
    language: Sequelize.INTEGER,
    year: Sequelize.STRING,
    classCode: Sequelize.STRING,
    lecturerName: Sequelize.STRING,
    studentName: Sequelize.STRING,
    studentCode: Sequelize.STRING,
    note: { type: Sequelize.STRING, defaultValue: ''},
    teacherNumber: { type: Sequelize.INTEGER, defaultValue: 1},
    hour: Sequelize.FLOAT
  },{
    timestamps: false
  });
  return Dissertation;
}
