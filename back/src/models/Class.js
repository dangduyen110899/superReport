module.exports = (sequelize, Sequelize) => {

  const Class = sequelize.define('class', {
    code: {
      type: Sequelize.STRING,
      primaryKey: true,
      autoIncrement: false,
    }
  }, {
    timestamps: false
  });

  return Class;
}

