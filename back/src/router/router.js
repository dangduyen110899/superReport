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

function route(app) {

// them dinh muc
app.get('/api/admin/quota', [authJwt.verifyToken, authJwt.isAdminorAdmin1],quota.list);
app.post('/api/admin/quota/create',[authJwt.verifyToken, authJwt.isAdminorAdmin1],quota.create);
app.post('/api/admin/quota/creates', [authJwt.verifyToken, authJwt.isAdminorAdmin1],upload.single("file"),quota.creates);
app.put('/api/admin/quota/update',[authJwt.verifyToken, authJwt.isAdminorAdmin1],quota.update);

// trong đại học 
app.get('/api/admin/lecturer', [authJwt.verifyToken, authJwt.isAdminorAdmin1],lecturer.list);
app.post('/api/admin/lecturer/create',[authJwt.verifyToken, authJwt.isAdminorAdmin1],lecturer.create);
app.post('/api/admin/lecturer/creates', [authJwt.verifyToken, authJwt.isAdminorAdmin1],upload.single("file"),lecturer.creates);
app.put('/api/admin/lecturer/update',[authJwt.verifyToken, authJwt.isAdminorAdmin1],lecturer.update);

// dai hoc
app.get('/api/admin/student', [authJwt.verifyToken, authJwt.isAdminorAdmin1],student.list);
app.post('/api/admin/student/create', [authJwt.verifyToken, authJwt.isAdminorAdmin1],student.create);
app.post('/api/admin/student/creates', [authJwt.verifyToken, authJwt.isAdminorAdmin1],upload.single("file"),student.creates);
app.put('/api/admin/student/update', [authJwt.verifyToken, authJwt.isAdminorAdmin1],student.update);

// dai hoc
app.get('/api/admin/thesis', [authJwt.verifyToken, authJwt.isAdminorAdmin1], thesis.list);
app.post('/api/admin/thesis/creates', [authJwt.verifyToken, authJwt.isAdminorAdmin1],upload.single("file"),thesis.creates);
app.post('/api/admin/thesis/checkYear', [authJwt.verifyToken, authJwt.isAdminorAdmin1],thesis.checkYear);

// dai hoc
app.get('/api/admin/tkb', [authJwt.verifyToken, authJwt.isAdminorAdmin1],  subSubjectLecturer.list );
app.post('/api/admin/tkb/creates', [authJwt.verifyToken, authJwt.isAdminorAdmin1],upload.single("file"),subSubjectLecturer.creates);
app.post('/api/admin/tkb/checkYear', [authJwt.verifyToken, authJwt.isAdminorAdmin1],subSubjectLecturer.checkYear);

app.get('/api/detailThesis', [authJwt.verifyToken, authJwt.isLeaderOrAdminorUser], thesis.detailList);
app.get('/api/detailTkb', [authJwt.verifyToken, authJwt.isLeaderOrAdminorUser],  subSubjectLecturer.detailList );
app.get('/api/report', [authJwt.verifyToken, authJwt.isLeaderOrAdminorUser],report.list);
app.post('/api/report/export', [authJwt.verifyToken, authJwt.isLeaderOrAdminorUser],report.export);

app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
	
app.post('/api/auth/signin', controller.signin);


}

// exprot route
module.exports = route;