const User = require('../../models/User');  //import User from models
//express to write routes
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
//parses the route after/api/users as it gets redirected from server.js
//@route :/api/users/register
//@desc : Register user 
//@access:public
//then - executes when db req completes succesfully it may or may not find record
//in then user is the data returned from findOne
//catch - executes when db req fails due to connrection error 
router.post('/register',(req,res)=>{
  const {errors,isValid} = validateRegisterInput(req.body);
  if(!isValid){
    
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email})
  .then(user=>{
    if(user){
      return res.status(400).json({email :'User already Exists'});
    } //already exists
    else
    {
      //avatar : gravatar.url will return will be a link to image found or dummy image
       const avatar=gravatar.url(req.body.email,{
          s: '200' , //size
          r: 'pg', //pg rating
          d: 'mm' //retun dumy image  if not found
        });

        const newUser = new User({
          name : req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar //if key and value are same avatar(schema) =avatar(variable name) its called decomposition in JS and write only left side name.
        });
        //spins for 10 rounds to generate salt
        //promise and call back any of them can be used.
        //callback is used within the function and promise is outside function call
        bcrypt.genSalt(10,(err,salt)=>{
          bcrypt.hash(req.body.password,salt,(err,hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(user=>res.json(user))
            .catch(err=>console.log('err'))
          })
        })       
    }
  })
  .catch();
});

//@route :POST /api/users/login
//@desc : Login user /return JWT token
//@access:public

router.post('/login',(req,res)=>{
  const {errors,isValid} = validateLoginInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }
  User.findOne({email: req.body.email})
  .then(user=>{
    if(!user){
      return res.status(404).json({email: 'User Not Found'});
    }
    else
    {
      bcrypt.compare(req.body.password,user.password) //ismatch boolen T or F
      .then(isMatch => {
        if(isMatch){
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          };
          //tokemn needs to be generated and singed
          //key is needed to sign the payload
          jwt.sign(payload,keys.secretOrKey,
            {expiresIn:  3600},
            (err,token)=>{
              return res.json({token: 'Bearer '+ token})
            }
            );         
        }
        else
           return res.status(400).json({password:'Invalid Password'});
      });
    }
  })
  .catch(err=>console.log(err));
})
//passport.authenticate will return the user in the form of req to the next call
//req will have all user info 
router.get('/current',passport.authenticate('jwt',{session: false}),
(req,res)=>{
  res.json({
    id: req.user.id,
    name: req.user.name,
    email:req.user.email

  });
}
)

//@route :Get /api/users/current
//@desc : Return current user 
//@access:private
//to make route a private route additional parameter is needed passport

module.exports=router;