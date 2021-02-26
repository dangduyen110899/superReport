module.exports = (sequelize, Sequelize) => {

  var User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    name: Sequelize.STRING,
  },{
    timestamps: false
  });
  return User;
}