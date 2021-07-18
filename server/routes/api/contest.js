/*const express = require('express');
const router = express.Router();

router.post("/create",(req,res)=>{
    
});*/

const router = require('express').Router();
const multer  = require('multer');
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
const Grid = require('gridfs-stream');
const CONTEST = require('../../models/CONTEST');
const { request, response } = require('express');

// set up connection to db for file storage
const storage = require('multer-gridfs-storage')({url: db});

router.post('/create', (req, res) => {
   try{
       console.log(req.body);
       let question = [];

        const newContest= new CONTEST({
            contestname : req.body.contestname,
            contestdate : req.body.contestdate,
            contestId   : req.body.contestid,
            questionno  : req.body.questionno,
            question    : req.body.question
        });
        console.log(newContest);
        newContest.save();
        res.status(200).send("done");
   }
   catch(error){
        console.log(error);
        res.status(400).send(error);
   }
});
router.post("/getcontests",(req,res)=>{
   var contestNames = [];
   CONTEST.find().then(response=>{
      console.log(response);
      response.map((r)=>{
         contestNames.push([r.contestdate,r.contestname,r.contestId]);
         contestNames.sort();
      })
      res.status(200).send(contestNames)})
   .catch(err=>{
      res.status(400).send(err);
   });
});

router.post("/contest",(req,res)=>{
   var contest;
   CONTEST.findOne({contestname: req.body.contestname})
   .then(response=>{
      contest=response;
      res.status(200).send(contest);
   })
})


module.exports = router;