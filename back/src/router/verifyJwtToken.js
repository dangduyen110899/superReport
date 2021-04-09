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

isAdmin = (req, res, next) => {
	let token = req.headers['x-access-token'];
	
	User.findOne({where: {id: req.userId}})
		.then(user => {
			if (user.dataValues.role === 'ADMIN') {
				next();
				return;
			}
			res.status(403).send({message: "Require Admin Role!"});
			return;
		})
}

isLeaderOrAdmin = (req, res, next) => {
	let token = req.headers['x-access-token'];
	
	User.findOne({where: {id: req.userId}})
		.then(user => {
			if (user.dataValues.role === 'ADMIN' || user.dataValues.role === 'LEADER') {
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
			if (user.dataValues.role === 'LEADER') {
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
authJwt.isAdmin = isAdmin;
authJwt.isUser = isUser;
authJwt.isLeaderOrAdmin = isLeaderOrAdmin;

module.exports = authJwt;