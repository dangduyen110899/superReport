// đồ án tốt nghiệp
module.exports = (sequelize, Sequelize) => {

  var Project = sequelize.define('project', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameProject: Sequelize.STRING,
    semester: Sequelize.INTEGER,
    year: Sequelize.STRING,
    classCode: Sequelize.STRING,
    lecturerName: Sequelize.STRING,
    studentName: Sequelize.STRING,
    studentCode: Sequelize.STRING,
    note: { type: Sequelize.STRING, defaultValue: ''},
    teacherNumber: { type: Sequelize.INTEGER, defaultValue: 1},
    hour: Sequelize.FLOAT,
  },{
    timestamps: false
  });
  return Project;
}
