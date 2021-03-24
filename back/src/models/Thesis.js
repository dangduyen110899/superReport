// khóa luận
module.exports = (sequelize, Sequelize) => {

  var Thesis = sequelize.define('thesis', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameThesis: Sequelize.STRING,
    semester: Sequelize.INTEGER,
    year: Sequelize.STRING,
    classCode: Sequelize.STRING,
    nvcl: Sequelize.INTEGER,
    hour: Sequelize.FLOAT,
    language: Sequelize.INTEGER,
    lecturerName: Sequelize.STRING,
    studentName: Sequelize.STRING,
    studentCode: Sequelize.STRING,
    birthday: Sequelize.STRING,
    note: Sequelize.STRING,
    teacherNumber: Sequelize.INTEGER,
  },{
    timestamps: false
  });
  return Thesis;
}
