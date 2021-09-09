const mongoose = require('mongoose');
const Schema = mongoose.Schema; //get Schema library from mongoose

const ProfileSchema = new Schema({

  user: {  //relationship tp user table ,id of the user will be the foreign key
    // ref is the table name ObjectId is the type of the id coming for user table
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle:{
    type: String,
    required: true,
    max: 40
  },
  company:{
    type: String,
  },
  website:{
    type: String,
  },
  location:{
    type: String,
  },
  status:{
    type: String,
    required: true
  },
  skills:{
    type: [String],  //array
    required: true
  },
  bio: {
    type: String
  },
  githubusername:{
    type: String
  },
  experience:[{   //ussr defined array 
    title:{
      type: String,
      required: true
    },
    company:{
      type: String,
      required: true
    },
    location:{
      type: String
    },
    from:{
      type: Date,

    },
    current: {
      type: Boolean,
      defualt: false
    },
    description:{
      type: String
    }

  }],
  education:[  //user defined array
    {
      school:{
        type: String,
        required: true

      },
      degree:{
        type: String,
        required:true
      },
      fieldofstudy:{
        type: String,
        required: true
      },
      from:{
        type: Date,
        required: true
      },
      to:{
        type: Date
      },

      current:{
        type: Boolean,
        defualt: false
      }
   }
  ],
  social:
  {  //object
    youtube:{
      type :String
    },
    twitter:{
      type: String
    },
    facebook:{
      type: String
    },
    linkedIn:{
      type: String
    },
    instagram:{
      type: String
    }
  
  },
  followers: [
    {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
   
  }
],
  following: [
    {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
    
  }
]

});

module.exports = Profile= mongoose.model('profiles',ProfileSchema); //profiles will be name in mongo db and is made oout of ProfileSchema