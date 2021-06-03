// import controller
const student = require('../controller/student');
const thesis = require('../controller/thesis');
const lecturer = require('../controller/lecturer');
const subSubjectLecturer = require('../controller/subSubjectLecturer');
let upload = require('../config/multer');
const report = require('../controller/report');
const quota = require('../controller/quota');
const controller = require('../controller/controller');
const authJwt = require('../router/verifyJwtToken');
const verifySignUp = require('../router/verifySignUp');
const project = require('../controller/project');
const phdThesis = require('../controller/phdThesis');
const dissertation = require('../controller/dissertation');
const consultant = require('../controller/consultant');
const practice = require('../controller/practice');


function route(app) {

// them dinh muc
app.get('/api/admin/quota', [authJwt.verifyToken, authJwt.isAdminorAdmin1],quota.list);
app.post('/api/admin/quota/create',[authJwt.verifyToken, authJwt.isAdminorAdmin1],quota.create);
app.post('/api/admin/quota/creates', [authJwt.verifyToken, authJwt.isAdminorAdmin1],upload.single("file"),quota.creates);
app.put('/api/admin/quota/update',[authJwt.verifyToken, authJwt.isAdminorAdmin1],quota.update);

// giang vien 
app.get('/api/admin/lecturer', [authJwt.verifyToken, authJwt.isAdminorAdmin1],lecturer.list);
app.post('/api/admin/lecturer/create',[authJwt.verifyToken, authJwt.isAdminorAdmin1],lecturer.create);
app.post('/api/admin/lecturer/creates', [authJwt.verifyToken, authJwt.isAdminorAdmin1],upload.single("file"),lecturer.creates);
app.put('/api/admin/lecturer/update',[authJwt.verifyToken, authJwt.isAdminorAdmin1],lecturer.update);

// sinh vien
app.get('/api/admin/student', [authJwt.verifyToken, authJwt.isAdminorAdmin1],student.list);
app.post('/api/admin/student/create', [authJwt.verifyToken, authJwt.isAdminorAdmin1],student.create);
app.post('/api/admin/student/creates', [authJwt.verifyToken, authJwt.isAdminorAdmin1],upload.single("file"),student.creates);
app.put('/api/admin/student/update', [authJwt.verifyToken, authJwt.isAdminorAdmin1],student.update);

// kltn
app.get('/api/admin/thesis', [authJwt.verifyToken, authJwt.isAdminorAdmin1], thesis.list);
app.post('/api/admin/thesis/creates', [authJwt.verifyToken, authJwt.isAdminorAdmin1],upload.single("file"),thesis.creates);
app.post('/api/admin/thesis/checkYear', [authJwt.verifyToken, authJwt.isAdminorAdmin1],thesis.checkYear);

// tkb
app.get('/api/admin/tkb', [authJwt.verifyToken, authJwt.isAdminorAdmin1],  subSubjectLecturer.list );
app.post('/api/admin/tkb/creates', [authJwt.verifyToken, authJwt.isAdminorAdmin1],upload.single("file"),subSubjectLecturer.creates);
app.post('/api/admin/tkb/checkYear', [authJwt.verifyToken, authJwt.isAdminorAdmin1],subSubjectLecturer.checkYear);

// datn
app.get('/api/admin/project', [authJwt.verifyToken, authJwt.isAdminorAdmin1], project.list);
app.post('/api/admin/project/creates', [authJwt.verifyToken, authJwt.isAdminorAdmin1],upload.single("file"),project.creates);
app.post('/api/admin/project/checkYear', [authJwt.verifyToken, authJwt.isAdminorAdmin1],project.checkYear);


// lvts
app.get('/api/admin/phdThesis', [authJwt.verifyToken, authJwt.isAdminorAdmin1], phdThesis.list);
app.post('/api/admin/phdThesis/creates', [authJwt.verifyToken, authJwt.isAdminorAdmin1],upload.single("file"),phdThesis.creates);
app.post('/api/admin/phdThesis/checkYear', [authJwt.verifyToken, authJwt.isAdminorAdmin1],phdThesis.checkYear);

// lats
app.get('/api/admin/dissertation', [authJwt.verifyToken, authJwt.isAdminorAdmin1], dissertation.list);
app.post('/api/admin/dissertation/creates', [authJwt.verifyToken, authJwt.isAdminorAdmin1],upload.single("file"),dissertation.creates);
app.post('/api/admin/dissertation/checkYear', [authJwt.verifyToken, authJwt.isAdminorAdmin1],dissertation.checkYear);

// cvht
app.get('/api/admin/consultant', [authJwt.verifyToken, authJwt.isAdminorAdmin1], consultant.list);
app.post('/api/admin/consultant/creates', [authJwt.verifyToken, authJwt.isAdminorAdmin1],upload.single("file"),consultant.creates);
app.post('/api/admin/consultant/checkYear', [authJwt.verifyToken, authJwt.isAdminorAdmin1],consultant.checkYear);

// tttd
app.get('/api/admin/practice', [authJwt.verifyToken, authJwt.isAdminorAdmin1], practice.list);
app.post('/api/admin/practice/creates', [authJwt.verifyToken, authJwt.isAdminorAdmin1],upload.single("file"),practice.creates);
app.post('/api/admin/practice/checkYear', [authJwt.verifyToken, authJwt.isAdminorAdmin1],practice.checkYear);

// bao cao
app.get('/api/detailThesis', [authJwt.verifyToken, authJwt.isLeaderOrAdminorUser], thesis.detailList);
app.get('/api/detailTkb', [authJwt.verifyToken, authJwt.isLeaderOrAdminorUser],  subSubjectLecturer.detailList );
app.get('/api/report', [authJwt.verifyToken, authJwt.isLeaderOrAdminorUser],report.list);
app.get('/api/report/detail', [authJwt.verifyToken, authJwt.isLeaderOrAdminorUser],report.detail);

// app.post('/api/report', [authJwt.verifyToken, authJwt.isLeaderOrAdminorUser],report.list);

app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
	
app.post('/api/auth/signin', controller.signin);


}

// exprot route
module.exports = route;