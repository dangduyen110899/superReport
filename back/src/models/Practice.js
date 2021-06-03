// luận văn
module.exports = (sequelize, Sequelize) => {

  var Practice = sequelize.define('practice', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    semester: Sequelize.INTEGER,
    year: Sequelize.STRING,
    lecturerName: Sequelize.STRING,
    date: Sequelize.STRING,
    note: { type: Sequelize.STRING, defaultValue: ''},
    hour: Sequelize.FLOAT
  },{
    timestamps: false
  });
  return Practice;
}
