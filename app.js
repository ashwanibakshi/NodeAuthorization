var express     = require('express');
var mongoose    = require('mongoose');
var session     = require('express-session');
var bodyParser  = require('body-parser');

//connect to db
mongoose.connect('mongodb://localhost:27017/authorizee',{useNewUrlParser:true})
.then(()=>console.log('connected to db'))
.catch((err)=>console.log('error',err))

//init app
var app = express();

//fetch data from the request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//session
app.use(session({
    secret:'THISISmykey12345',
    resave:false,
    saveUninitialized:false
}));

//route
app.use('/user',require('./routes/users'));

//assign port
var port = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at '+port));