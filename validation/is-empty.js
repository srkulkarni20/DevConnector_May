const isEmpty = value => 
  value=== undefined ||
  value===null||
  (typeof value==='object' && Object.keys(value).length===0)||
  (typeof value=== 'string' && value.trim().length===0);

  module.exports=isEmpty;

  //builtin ISEmpty java function just checks whether the object is defined or undefined not the value length and also whether it has any value