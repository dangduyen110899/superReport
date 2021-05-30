// đồ án tốt nghiệp
module.exports = (sequelize, Sequelize) => {

  var Project = sequelize.define('project', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameProject: Sequelize.STRING,
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
  return Project;
}

