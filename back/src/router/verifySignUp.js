const db = require('../config/db.js');
const config = require('../config/config');
const User = db.user;
const ROLEs = config.ROLEs; 
const Role = db.role;

checkDuplicateEmail = (req, res, next) => {
	User.findOne({ 
		where: {
			email: req.body.email
		} 
	}).then(user => {
		if(user){
			res.status(400).send("Fail -> Email is already in use!");
			return;
		}
				
		next();
	});
}
checkErrorEmail = (req, res, next) => {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	var email = re.test(String(req.body.email).toLowerCase());
	if(!email){
		res.status(400).send("Email invalid");
		return;
	}	
	next();
}

checkPassword = (req, res, next) => {
		if(req.body.password!=req.body.passwordConfirm){
			res.status(400).send("passwordConfirm is fail");
			return;
		}	
		next();
}

checkDuplicateUserNameOrEmail = (req, res, next) => {
	// -> Check Email is already in use
	User.findOne({ 
		where: {
			email: req.body.email
		} 
	}).then(user => {
		if(user){
			res.status(400).send("Fail -> Email is already in use!");
			return;
		}
			
		next();
	});
}

checkRolesExisted = (req, res, next) => {	
	for(let i=0; i<req.body.roles.length; i++){
		if(!ROLEs.includes(req.body.roles[i].toUpperCase())){
			res.status(400).send("Fail -> Does NOT exist Role = " + req.body.roles[i]);
			return;
		}
	}
	next();
}

const signUpVerify = {};
signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;
signUpVerify.checkRolesExisted = checkRolesExisted;
signUpVerify.checkDuplicateEmail = checkDuplicateEmail;
signUpVerify.checkPassword = checkPassword;
signUpVerify.checkErrorEmail = checkErrorEmail;
module.exports = signUpVerify;