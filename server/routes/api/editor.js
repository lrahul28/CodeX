const express = require("express");
const router = express.Router();
const hackerearth = require("hackerearth-node");
const axios = require("axios");
const Contest = require("../../models/CONTEST");
const RESULT = require("../../models/RESULT");
const LEADERBOARD = require("../../models/LEADERBOARD");
var time_limits={
    "JAVASCRIPT_NODE": 10,
    "C": 1,
    "CPP14": 1,
    "JAVA8": 2,
    "PYTHON": 10,
    "PYTHON3": 10,
    "SCALA": 7,
    "CSHARP": 3,
    "GO" : 4,
    "RUST": 5,
    "RUBY": 5,
    "R" : 13
};

var memory_limits={
    "JAVASCRIPT_NODE": 1536,
    "C": 512,
    "CPP14": 512,
    "JAVA8": 2046,
    "PYTHON": 512,
    "PYTHON3": 512,
    "SCALA": 512,
    "CSHARP": 512,
    "GO" : 1024,
    "RUST": 512,
    "RUBY": 512,
    "R" : 512
};


router.post("/run",(req,res) => {
    var hackerEarth=new hackerearth("b9e57deca62c92c6784841a5aeb10428e30efb3a",'');
    var config={};
    config.time_limit=time_limits[req.body.lang];  //your time limit in integer
    config.memory_limit=memory_limits[req.body.lang];  //your memory limit in integer
    config.source=req.body.source;  //your source code for which you want to use hackerEarth api
    config.input=req.body.testcases;  //input against which you have to test your source code
    config.language=req.body.lang; //optional choose any one of them or none

    hackerEarth.run(config,(err,response) => {
        if(err) {
            res.status(400).json(err);
        }
        res.status(200).json(response);
    }
    )
});

router.post("/runtestcases",(req,res)=>{
    var hackerEarth=new hackerearth("b9e57deca62c92c6784841a5aeb10428e30efb3a",'');
    var config={};
    console.log(req.body);
    var result=Contest.find({contestname: req.body.contest})
            .then(cont=>{
                console.log(cont[0].question);
                var inx= cont[0].question.findIndex((q)=>{
                    console.log(q);
                    return q.questiontitle===req.body.question;
                })
                console.log(inx);
                var file1=Buffer.from(cont[0].question[inx].testcasefile1, 'base64').toString('ascii');
                var file2=Buffer.from(cont[0].question[inx].testcasefile2, 'base64').toString('ascii');

                config.time_limit=time_limits[req.body.lang];  //your time limit in integer
                config.memory_limit=memory_limits[req.body.lang];  //your memory limit in integer
                config.source=req.body.source;  //your source code for which you want to use hackerEarth api
                config.input=file1;  //input against which you have to test your source code
                config.language=req.body.lang; //optional choose any one of them or none

                hackerEarth.run(config,(err,response) => {
                    if(err) {
                        res.status(400).json(err);
                    }
                    if(response){
                        var ret = JSON.parse(response); 
                        console.log(ret.run_status.output,file2);
                        if(ret.run_status.output === file2){
                            ret.codingAssignmentStatus="ACCEPTED";
                            RESULT.find({contestname: req.body.contest,user: req.body.auth.user.id})
                                    .then((use)=>{
                                        console.log(use);
                                        if(use.length===0){
                                           const result= new RESULT({
                                                username: req.body.auth.user.name,
                                                user: req.body.auth.user.id,
                                                contestname: req.body.contest,
                                                questionno: 1,
                                                question: new Array(req.body.question),
                                                points: 100,
                                            })
                                            result.save(); 
                                            LEADERBOARD.find({username: req.body.auth.user.name}).then((r)=>{
                                                console.log(r);
                                                if(r.length===0){
                                                    const lb = new LEADERBOARD({
                                                        username: req.body.auth.user.name,
                                                        points: 100
                                                    });
                                                    lb.save();
                                                }else{
                                                    console.log(r[0].points+100);
                                                    console.log(req.body.auth.user.name);
                                                    LEADERBOARD.update({username: req.body.auth.user.name},{$set:{points: r[0].points+100}}).then(re=>{console.log(re)});
                                                }
                                            })                                      }
                                        else{
                                        var r =use[0].question.find((q)=>{
                                            return q===req.body.question;
                                        })
                                        console.log(r);
                                        if(r===undefined){
                                            RESULT.update({user: use[0].user,contestname: use[0].contestname},{$push: {question: req.body.question}}).then(res=>console.log(res));
                                            RESULT.update({user: use[0].user,contestname: use[0].contestname},{$set: {questionno: use[0].questionno+1}}).then(res=>console.log(res));
                                            RESULT.update({user: use[0].user,contestname: use[0].contestname},{$set: {points: 100*(use[0].questionno+1)}}).then(res=>console.log(res));
                                            LEADERBOARD.find({username: req.body.auth.user.name}).then((r1)=>{
                                                console.log(r1);
                                                if(r1.length===0){
                                                    const lb = new LEADERBOARD({
                                                        username: req.body.auth.user.name,
                                                        points: 100
                                                    });
                                                    lb.save();
                                                }else{
                                                    LEADERBOARD.update({username: req.body.auth.user.name},{$set:{points: r1[0].points+100}}).then(re=>console.log(re));
                                                }
                                            });
                                        }
                                    }
                                    })
                        }else{ 
                            ret.codingAssignmentStatus="TEST CASES FAILED";
                        }
                        console.log(ret);
                        res.status(200).send(ret);
                    }
                }
                )
            
            })
            .catch(err =>{
                console.log(err);
            });
});

module.exports = router;