// luận án

module.exports = (sequelize, Sequelize) => {

  var Doctoral = sequelize.define('doctoral', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: Sequelize.INTEGER,
    semester: Sequelize.INTEGER,
    year: Sequelize.STRING,
    classCode: Sequelize.STRING,
  },{
    timestamps: false
  });
  return Doctoral;
}
