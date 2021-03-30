// import controller
const student = require('../controller/student');
const thesis = require('../controller/thesis');
const lecturer = require('../controller/lecturer');
const subSubjectLecturer = require('../controller/subSubjectLecturer');
let upload = require('../config/multer');
const report = require('../controller/report');
const controller = require('../controller/controller');
const authJwt = require('../router/verifyJwtToken');
const verifySignUp = require('../router/verifySignUp');

function route(app) {

//  app.get('/api/lecturer/hehe',function(res,req) {lecturer.hehe});
app.get('/api/admin/lecturer', [authJwt.verifyToken, authJwt.isLeaderOrAdmin],function () {
    lecturer.list
});
app.post('/api/admin/lecturer/create',[authJwt.verifyToken, authJwt.isAdmin],lecturer.create);
app.post('/api/admin/lecturer/creates', [authJwt.verifyToken, authJwt.isAdmin],upload.single("file"),lecturer.creates);
app.put('/api/admin/lecturer/update',[authJwt.verifyToken, authJwt.isAdmin],lecturer.update);

app.get('/api/admin/student', [authJwt.verifyToken, authJwt.isLeaderOrAdmin],student.list);
app.post('/api/admin/student/create', [authJwt.verifyToken, authJwt.isAdmin],student.create);
app.post('/api/admin/student/creates', [authJwt.verifyToken, authJwt.isAdmin],upload.single("file"),student.creates);
app.put('/api/admin/student/update', [authJwt.verifyToken, authJwt.isAdmin],student.update);

app.get('/api/admin/thesis', [authJwt.verifyToken, authJwt.isAdmin], function () {
    isLeaderOrAdmin.list
});
// app.post('/api/admin/thesis/create',thesis.create);
app.post('/api/admin/thesis/creates', [authJwt.verifyToken, authJwt.isAdmin],upload.single("file"),thesis.creates);
app.post('/api/admin/thesis/checkYear', [authJwt.verifyToken, authJwt.isAdmin],thesis.checkYear);
app.put('/api/admin/thesis/update', [authJwt.verifyToken, authJwt.isAdmin],thesis.update);


app.get('/api/admin/tkb', [authJwt.verifyToken, authJwt.isLeaderOrAdmin],  function () {
    subSubjectLecturer.list
} );
app.post('/api/admin/tkb/create', [authJwt.verifyToken, authJwt.isAdmin],subSubjectLecturer.create);
app.post('/api/admin/tkb/creates', [authJwt.verifyToken, authJwt.isAdmin],upload.single("file"),subSubjectLecturer.creates);
app.post('/api/admin/tkb/checkYear', [authJwt.verifyToken, authJwt.isAdmin],subSubjectLecturer.checkYear);
//app.get('/api/admin/tkb/update',subSubjectLecturer.update);

app.get('/api/admin/report', [authJwt.verifyToken, authJwt.isLeaderOrAdmin],report.list);

app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
	
app.post('/api/auth/signin', controller.signin);


}

// exprot route
module.exports = route;