module.exports = (sequelize, Sequelize) => {

  var Lecturer = sequelize.define('lecturer', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: Sequelize.STRING,
    email: {type: Sequelize.STRING, unique: true},
    programs: Sequelize.INTEGER,
    status: Sequelize.INTEGER
  },{
    timestamps: false
  });

  return Lecturer;
}
