const express = require('express');  //importing library express
const app = express();  //create instance of express.
const mongoose = require('mongoose');
//db config,need to retrieve config require needs to be used when we need to reference other file.
const db = require('./config/keys').mongoURI;
mongoose
.connect(db)
.then(() => console.log('DB Connected'))
.catch(err=>console.log(err));


//first route app.get is a function when user comes to '/' ths route then call   the function with input req and res .Its also called callback

app.get('/',(req,res)=>res.send('Hello World 234')); //When it come to hime page just send hello back




const port = 9456; 
//Ask express to listen on this port
//string inference in js using $ and `
app.listen(port,()=>console.log(`server is running on port ${port}`));