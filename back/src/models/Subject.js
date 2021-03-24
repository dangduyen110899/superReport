
module.exports = (sequelize, Sequelize) => {

  const Subject = sequelize.define('subject', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: Sequelize.STRING,
    name: Sequelize.STRING,
    duration: Sequelize.INTEGER,
    type: Sequelize.STRING,
    theoriticalHour: Sequelize.STRING,
    practicalHour: Sequelize.STRING,
    selfstudyHour: Sequelize.STRING,
    prerequisiteCode: Sequelize.STRING,
  },{
    timestamps: false
  });

  return Subject
}

