module.exports = (sequelize, Sequelize) => {

  const SubSubjectLecturer = sequelize.define('subSubjectLecturer', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: Sequelize.INTEGER,
    day: Sequelize.INTEGER,
    time: Sequelize.STRING,
    total_student: Sequelize.INTEGER,
    total_tc: Sequelize.INTEGER,
    semester: Sequelize.INTEGER,
    year: Sequelize.STRING,
    job: Sequelize.STRING,
    classSubjectCode: Sequelize.STRING,
    teacherNumber: Sequelize.INTEGER,
  },{
    timestamps: false
  });

  return SubSubjectLecturer;
}