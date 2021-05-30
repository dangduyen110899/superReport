module.exports = (sequelize, Sequelize) => {

  var Lecturer = sequelize.define('lecturer', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {type: Sequelize.STRING},
    email: {type: Sequelize.STRING},
    programs: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
    department: Sequelize.STRING,
    subject: Sequelize.STRING,
    mode: Sequelize.STRING,
    position: { type: Sequelize.STRING, defaultValue: 'GV'},
    đh: { type: Sequelize.INTEGER, defaultValue: 1},
    sđh: { type: Sequelize.INTEGER, defaultValue: 0},
  },{
    timestamps: false
  });

  return Lecturer;
}
