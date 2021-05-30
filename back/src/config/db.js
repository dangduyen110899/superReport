const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: 0,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
let db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.reportHour = require('../models/ReportHour')(sequelize, Sequelize);
db.subSubjectLecturer = require('../models/SubSubjectLecturer')(sequelize, Sequelize);

db.thesis = require('../models/Thesis')(sequelize, Sequelize);

db.class = require('../models/Class')(sequelize, Sequelize);
db.subject = require('../models/Subject')(sequelize, Sequelize);
// db.classSubject = require('../models/ClassSubject')(sequelize, Sequelize);
// bổ sung danh sách hd
db.project = require('../models/Project')(sequelize, Sequelize);
db.phdThesis = require('../models/PhdThesis')(sequelize, Sequelize);
db.dissertation = require('../models/Dissertation')(sequelize, Sequelize);
db.consultant = require('../models/Consultant')(sequelize, Sequelize);
db.practice = require('../models/Practice')(sequelize, Sequelize);

db.student = require('../models/Student')(sequelize, Sequelize);
db.lecturer = require('../models/Lecturer')(sequelize, Sequelize);


// authenti
db.user = require('../models/User')(sequelize, Sequelize);
db.quota = require('../models/Quota')(sequelize, Sequelize);

db.thesis.belongsTo(db.lecturer);
db.thesis.belongsTo(db.student);

db.class.hasMany(db.student);
db.student.belongsTo(db.class);

db.lecturer.hasMany(db.subSubjectLecturer);
db.subSubjectLecturer.belongsTo(db.lecturer);

db.subject.hasMany(db.subSubjectLecturer);
db.subSubjectLecturer.belongsTo(db.subject);
db.lecturer.hasMany(db.thesis);

db.project.belongsTo(db.lecturer);
db.project.belongsTo(db.student);

db.phdThesis.belongsTo(db.lecturer);
db.phdThesis.belongsTo(db.student);

db.dissertation.belongsTo(db.lecturer);
db.dissertation.belongsTo(db.student);

db.consultant.belongsTo(db.lecturer);
db.consultant.belongsTo(db.student);

db.practice.belongsTo(db.lecturer);
// db.quota.hasMany(db.lecturer);
// db.lecturer.belongsTo(db.quota);


// db.role.hasMany(db.user_roles);
// db.user_roles.belongsTo(db.lecturer);

// db.user.hasMany(db.user_roles);
// db.user_roles.belongsTo(db.subject);

 
// db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
// db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});

// db.lecturer.belongsToMany(db.subject, { through: 'subSubjectLecturer', foreignKey: 'teacherCode', otherKey: 'subjectCode' });
// db.subject.belongsToMany(db.lecturer, { through: 'subSubjectLecturer', foreignKey: 'subjectCode', otherKey: 'teacherCode' });

 module.exports = db;