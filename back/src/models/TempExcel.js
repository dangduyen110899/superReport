module.exports = (sequelize, Sequelize) => {

  var TempExcel = sequelize.define('tempExcel', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    year: Sequelize.STRING,
    semester: Sequelize.INTEGER,
    nameTkb: Sequelize.STRING,
    nameKltn: Sequelize.STRING,
    nameDatn: Sequelize.STRING,
    nameLvts: Sequelize.STRING,
  },{
    timestamps: false
  });

  return TempExcel;
}
