// luận văn
module.exports = (sequelize, Sequelize) => {

  var Dissertation = sequelize.define('dissertation', {
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
  return Dissertation;
}
