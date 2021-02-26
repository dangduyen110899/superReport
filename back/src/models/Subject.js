
module.exports = (sequelize, Sequelize) => {

  const Subject = sequelize.define('subject', {
    code: {
      type: Sequelize.STRING,
      primaryKey: true,
      autoIncrement: false,
    },
    name: Sequelize.STRING,
    timeLt: Sequelize.INTEGER,
    timeTh: Sequelize.INTEGER,
    timeThoc: Sequelize.INTEGER,
  },{
    timestamps: false
  });

  return Subject
}

