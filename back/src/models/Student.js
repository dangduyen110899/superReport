module.exports = (sequelize, Sequelize) => {

  const Student = sequelize.define('student', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: Sequelize.STRING,
    name: Sequelize.STRING,
    status: Sequelize.INTEGER
  },{
    timestamps: false
  });

  return Student;
}

