const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim : true
    },
   
    about: {
      type: String,
      trim : true
    },
    instagram: {
      type: String,
      trim : true
    },
    facebook: {
        type: String,
        trim : true
      },
      github: {
        type: String,
        trim : true
      },
      google: {
        type: String,
        trim : true
      },
      linkedin: {
        type: String,
        trim : true
      },
   
    photo: {
      data: Buffer,
      contentType: String,
    },
  
  },
);

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;