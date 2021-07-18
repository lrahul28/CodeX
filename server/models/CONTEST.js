const mongoose = require("mongoose");

const ContestSchema = new mongoose.Schema({
  contestname: {
    type: String,
    required: true
  },
  contestdate:{
    type: Date,
    required: true
  },
  contestId: {
    type: String,
    required: true,
    unique: true
  },
  questionno: {
    type: Number,
    required: true
  },
  question: [{
      questiontitle: {type: String,required: true},
      question: {type: String, required: true},
      testcasefilename1: {type: String, required: true},
      testcasefile1 : {type: String, required: true},
      testcasefilename2: {type: String, required: true},
      testcasefile2 : {type: String, required: true},
  }]
});

module.exports = Contest = mongoose.model("contests", ContestSchema);