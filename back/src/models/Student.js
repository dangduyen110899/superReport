module.exports = (sequelize, Sequelize) => {

  const Student = sequelize.define('student', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {type: Sequelize.STRING, unique: true},
    name: Sequelize.STRING,
    birthday: Sequelize.DATE,
    status: Sequelize.INTEGER,
    address: Sequelize.STRING,
    gender: Sequelize.STRING,
  },{
    timestamps: false
  });

  return Student;
}


