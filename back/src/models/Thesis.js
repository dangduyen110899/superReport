// khóa luận
module.exports = (sequelize, Sequelize) => {

  var Thesis = sequelize.define('thesis', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    semester: Sequelize.INTEGER,
    year: Sequelize.STRING,
    classCode: Sequelize.STRING,
    nvcl: Sequelize.INTEGER,
    hour: Sequelize.FLOAT,
    language: Sequelize.INTEGER,
    lecturerName: Sequelize.STRING,
    studentName: Sequelize.STRING,
  },{
    timestamps: false
  });
  return Thesis;
}
