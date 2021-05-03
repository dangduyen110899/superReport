module.exports = (sequelize, Sequelize) => {

  const SubSubjectLecturer = sequelize.define('subSubjectLecturer', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: Sequelize.INTEGER,
    address: Sequelize.STRING,
    note: Sequelize.STRING,
    day: Sequelize.STRING,
    time: Sequelize.STRING,
    total_student: Sequelize.INTEGER,
    total_tc: Sequelize.INTEGER,
    semester: Sequelize.INTEGER,
    year: Sequelize.STRING,
    job: Sequelize.STRING,
    classSubjectCode: Sequelize.STRING,
    teacherNumber: Sequelize.INTEGER,
    lecturerName: Sequelize.STRING,
    language: Sequelize.INTEGER,
    hour: Sequelize.FLOAT,
    program: { type: Sequelize.INTEGER, defaultValue: 0},
    nameSubject: Sequelize.STRING,
    subjectCode: Sequelize.STRING,
  },{
    timestamps: false
  });

  return SubSubjectLecturer;
}