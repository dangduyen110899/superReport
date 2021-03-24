const express = require("express");
const app = express();
const db = require('./config/db');
global.__basedir = __dirname;
const Role = db.role;

const cors = require('cors');
app.use(cors());

const route  = require('./router/router');

//Settings
app.set('port', process.env.PORT || 5000);

//Middlewares
app.use(express.json());

route(app);

app.get('/',(req,res)=>{
  res.send("Hello World form NodeJS express.");
});
// {force: true}
db.sequelize.sync({alter: true}).then(() => {
    console.log("Sequelize is Running");
	// initial();
}).catch(err => {
    console.log(err.message);
});

app.listen(app.get('port'),()=>{
  console.log("Start server on port "+app.get('port'))
})

function initial(){
	Role.create({
		id: 1,
		name: "USER"
	});
	
	Role.create({
		id: 2,
		name: "ADMIN"
	});
	
	Role.create({
		id: 3,
		name: "PM"
	});
}