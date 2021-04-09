module.exports = (sequelize, Sequelize) => {

  var Lecturer = sequelize.define('lecturer', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {type: Sequelize.STRING, unique: true},
    email: {type: Sequelize.STRING},
    programs: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
    department: Sequelize.STRING,
    subject: Sequelize.STRING,
    mode: Sequelize.STRING,
  },{
    timestamps: false
  });

  return Lecturer;
}
