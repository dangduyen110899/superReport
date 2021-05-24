module.exports = (sequelize, Sequelize) => {

  var Lecturer = sequelize.define('lecturer', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {type: Sequelize.STRING, unique: true},
    email: {type: Sequelize.STRING, unique: true},
    programs: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
    department: Sequelize.STRING,
    subject: Sequelize.STRING,
    mode: Sequelize.STRING,
    position: Sequelize.STRING,
    đh: { type: Sequelize.INTEGER, defaultValue: 1},
    sđh: { type: Sequelize.INTEGER, defaultValue: 0},
  },{
    timestamps: false
  });

  return Lecturer;
}
