module.exports = (sequelize, Sequelize) => {

  const ClassSubject = sequelize.define('classSubject', {
    code: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    job: Sequelize.STRING,
  }, {
    timestamps: false
  });

  return ClassSubject;
}

