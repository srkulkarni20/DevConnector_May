const express = require('express');  //importing library express
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const path = require('path');
const posts = require('./routes/api/posts');
const app = express(); 
const passport = require('passport');

//body parser config
//app receives all the request 
//to use body parser and convert data to json
app.use(bodyparser.urlencoded({extended:false}));
//encode url and treat special characters as is not toconvet to like space as or
//something like that
app.use(bodyparser.json());

//passport configuration .passport is to read and  decode the token.
app.use(passport.initialize()); //to initialoze passpport
require('./config/passport')(passport);//passport function from passport.js which is exported is called and executed only there is token


//db config,need to retrieve config require needs to be used when we need to reference other file.
const db = require('./config/keys').mongoURI;
mongoose
.connect(db)
.then(() => console.log('DB Connected'))
.catch(err=>console.log(err));


//first route app.get is a function when user comes to '/' ths route then call   ///the function with input req and res .Its also called callback


console.log("hello");
//When it come to hime page just send hello back
//route /api/users gets redirected to users.js file
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

if (process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html' ))
  });
}




const port = process.env.PORT || 9990; 
//Ask express to listen on this port
//string inference in js using $
app.listen(port,() => console.log(`server is running on port ${port}`));