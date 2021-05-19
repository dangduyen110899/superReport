// đồ án
module.exports = (sequelize, Sequelize) => {

    var Quota = sequelize.define('quota', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
      position: {
        type: Sequelize.STRING,
        defaultValue: 'GV',
        unique: true
      },
      rate: Sequelize.STRING,
      status: { type: Sequelize.INTEGER, defaultValue: 1},
    },{
      timestamps: false
    });
    return Quota;
  }
  