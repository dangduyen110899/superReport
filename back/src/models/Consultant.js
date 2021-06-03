// luận văn
module.exports = (sequelize, Sequelize) => {

  var Consultant = sequelize.define('consultant', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    semester: Sequelize.INTEGER,
    year: Sequelize.STRING,
    classCode: Sequelize.STRING,
    lecturerName: Sequelize.STRING,
    studentName: Sequelize.STRING,
    studentCode: Sequelize.STRING,
    note: { type: Sequelize.STRING, defaultValue: ''},
    teacherNumber: { type: Sequelize.INTEGER, defaultValue: 1},
    hour: Sequelize.FLOAT,
    birthday: Sequelize.STRING
  },{
    timestamps: false
  });
  return Consultant;
}
