const Validator = require('validator');
const isEmpty = require('./is-empty');

//function validregisterInput(data){

//}
//module.exports(validateregisterInput);//

module.exports =function validateLoginInput(data){
   let errors={};

   if(isEmpty(data.email)){
    errors.email= 'Email field is required';
  }
  if(!Validator.isEmail(data.email))
  {
    errors.email ='Email is not Valid';
  }
  if(!Validator.isLength(data.password,{min: 6,max: 30})){
    errors.name='Password must be between 6 and 30 characters in length';
  }

  if(isEmpty(data.password)){
    errors.password = 'Password field is required';
  }
  

  
  
  

   return{
     errors,
     isValid: isEmpty(errors)
   }
}
