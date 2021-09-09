const jwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt= require('passport-jwt').ExtractJwt;
const mongoose= require('mongoose');
const User = mongoose.model('users');  //another way to include the users or we include through file
const keys = require('../config/keys');
//opts is object ,which will be passed to passport.use function which will have parameters to extract payload from the bearer token
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //chk for the bearer token
opts.secretOrKey = keys.secretOrKey //get the key for decryption
//passport.use to get the payload back from token opts will have the token and secret key used to decrypt.done says request is completed and good to go
//if not done it will be unauthorized error
module.exports = passport =>{
  passport.use(new jwtStrategy(opts,(payload,done)=>{
  User.findById(payload.id)  //verify the user by quering with id in mongoosedb
  .then(user=>{
    if(user){
      console.log(user);
      return done(null,user); //whole user info is passed
    }
    return done(null,false);
  })
  .catch(err=>console.log(err))
  
}))
}