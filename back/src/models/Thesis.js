// khóa luận
module.exports = (sequelize, Sequelize) => {

  var Thesis = sequelize.define('thesis', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: Sequelize.INTEGER,
    semester: Sequelize.INTEGER,
    year: Sequelize.STRING,
    classCode: Sequelize.STRING,
    nvcl: Sequelize.INTEGER,
  },{
    timestamps: false
  });
  return Thesis;
}
