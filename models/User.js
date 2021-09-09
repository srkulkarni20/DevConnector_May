const mongoose = require('mongoose');
const Schema = mongoose.Schema; //get Schema library from mongoose

//create new schema
const UserSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  avatar:{
    type : String,//url by defualt not required
    required: false
  },
  created:{
    type: Date,
    default: Date.now //property in JS
  }

  });

  //Create a model in MongoDB
  module.exports =User=mongoose.model('users',UserSchema); //users is name in mongoDb,Userschema is defined above and it can be imported in other file is exports is used
