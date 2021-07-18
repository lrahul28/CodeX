const mongoose = require("mongoose");

const LeaderboardSchema = new mongoose.Schema({  
  username:{
    type: String,
    required: true
  },
  points: {
      type: Number,
      required: true,
      unique: false
  }
});

module.exports = Leaderboard = mongoose.model("leaderboards", LeaderboardSchema);