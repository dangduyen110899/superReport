const db = require('../config/db.js');
const config = require('../config/config.js');
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
	// Save User to Database
	console.log("Processing func -> SignUp");
	
	User.create({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
		role: req.body.roles[0]
	}).then( () => res.send("User registered successfully!"))
	.catch(err => {
			res.status(500).send("Error -> " + err);
		});
	}

exports.signin = (req, res) => {

	User.findOne({
		where: {
			email: req.body.email
		}
	}).then(user => {
		if (!user) {
			return res.status(404).send({message: 'User Not Found.'});
		}

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, accessToken: null, message: "Invalid Password!" });
		}
		
		var token = jwt.sign({ id: user.id }, config.secret, {
		  expiresIn: 86400 // expires in 24 hours
		});
		
		res.status(200).send({ auth: true, accessToken: token, roles: user.role, email: user.email});
		
	}).catch(err => {
		res.status(500).send('Error -> ' + err);
	});
}

// exports.userContent = (req, res) => {
// 	User.findOne({
// 		where: {id: req.userId},
// 		attributes: ['name', 'username', 'email'],
// 		include: [{
// 			model: Role,
// 			attributes: ['id', 'name'],
// 			through: {
// 				attributes: ['userId', 'roleId'],
// 			}
// 		}]
// 	}).then(user => {
// 		res.status(200).json({
// 			"description": "User Content Page",
// 			"user": user
// 		});
// 	}).catch(err => {
// 		res.status(500).json({
// 			"description": "Can not access User Page",
// 			"error": err
// 		});
// 	})
// }

