const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const db = require('../config/db.js');
const User = db.user;

verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token'];
  
	if (!token){
		return res.status(403).send({ 
			auth: false, message: 'No token provided.' 
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err){
			return res.status(500).send({ 
					auth: false, 
					message: 'Fail to Authentication. Error -> ' + err 
				});
		}
		req.userId = decoded.id;
		next();
	});
}

isAdminorAdmin1 = (req, res, next) => {
	let token = req.headers['x-access-token'];
	
	User.findOne({where: {id: req.userId}})
		.then(user => {
			if (user.dataValues.role === 'ADMIN' || user.dataValues.role === 'ADMIN1') {
				req.user = user.dataValues
				next();
				return;
			}
			res.status(403).send({message: "Require Admin Role!"});
			return;
		})
}

isLeaderOrAdminorUser = (req, res, next) => {
	let token = req.headers['x-access-token'];
	
	User.findOne({where: {id: req.userId}})
		.then(user => {
			const role = user.dataValues.role
			if (role === 'ADMIN' ||role === 'ADMIN1' || role === 'LĐCC' || role === 'LĐBM' || role === 'LĐK' || role === 'USER') {
				req.user = user.dataValues
				next();
				return;
			}
			res.status(403).send({message: "Require Admin or leader Role!"});
			return;
		})
}

isLeader = (req, res, next) => {
	let token = req.headers['x-access-token'];
	
	User.findOne({where: {id: req.userId}})
		.then(user => {
			if (user.dataValues.role === 'LĐCC') {
				next();
				return;
			}
			res.status(403).send({message: "Require leader Role!"});
			return;
		})
}

isUser = (req, res, next) => {
	let token = req.headers['x-access-token'];
	
	User.findOne({where: {id: req.userId}})
		.then(user => {
			if (user.dataValues.role === 'USER') {
				req.emailLecturer = user.dataValues.email
				next();
				return;
			}
			res.status(403).send({message: "Require lecturer Role!"});
			return;
		})
}

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdminorAdmin1 = isAdminorAdmin1;
authJwt.isUser = isUser;
authJwt.isLeaderOrAdminorUser = isLeaderOrAdminorUser;

module.exports = authJwt;