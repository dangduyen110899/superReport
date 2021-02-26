// import controller
const classSubject = require('../controller/classSubject');
const student = require('../controller/student');
const thesis = require('../controller/thesis');
const subject = require('../controller/subject');
const uploads = require('../controller/upload');
const lecturer = require('../controller/lecturer');
const tempExcel = require('../controller/tempExcel');
const subSubjectLecturer = require('../controller/subSubjectLecturer');

let upload = require('../config/multer');


function route(app) {

// route lecturer
//  app.get('/api/lecturer/hehe',function(res,req) {lecturer.hehe});
app.get('/api/admin/lecturer',lecturer.list);
app.post('/api/admin/lecturer/create',lecturer.create);
app.post('/api/admin/lecturer/creates',upload.single("file"),lecturer.creates);
app.put('/api/admin/lecturer/update',lecturer.update);

app.get('/api/admin/student',student.list);
app.post('/api/admin/student/create',student.create);
app.post('/api/admin/student/creates',upload.single("file"),student.creates);
app.put('/api/admin/student/update',student.update);

app.get('/api/admin/thesis',thesis.list);
// app.post('/api/admin/thesis/create',thesis.create);
app.post('/api/admin/thesis/creates',upload.single("file"),thesis.creates);
app.post('/api/admin/thesis/checkYear',thesis.checkYear);
app.put('/api/admin/thesis/update',thesis.update);


app.get('/api/admin/tkb',subSubjectLecturer.list);
app.post('/api/admin/tkb/create',subSubjectLecturer.create);
app.post('/api/admin/tkb/creates',upload.single("file"),subSubjectLecturer.creates);
app.post('/api/admin/tkb/checkYear',subSubjectLecturer.checkYear);
//app.get('/api/admin/tkb/update',subSubjectLecturer.update);
 app.post('/api/admin/report',subSubjectLecturer.report);

  app.get('/api/admin/thesis/getHour',thesis.getHour);



}

// exprot route
module.exports = route;