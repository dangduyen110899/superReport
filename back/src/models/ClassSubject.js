module.exports = (sequelize, Sequelize) => {

  const ClassSubject = sequelize.define('classSubject', {
    code: {
      type: Sequelize.STRING,
      primaryKey: true,
      autoIncrement: false,
    },
    job: Sequelize.STRING,
  }, {
    timestamps: false
  });

  return ClassSubject;
}

