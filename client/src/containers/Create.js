import {
  Button,
  Card,
  CardContent,
  Fab,
  Grid,
  Input,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Label } from "reactstrap";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";
import  { Redirect } from 'react-router-dom'

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contestname: "",
      selecteddate: new Date(),
      contestId: this.ID(),
      questionno: 1,
      question: [{
        questiontitle: "",
        question: "",
        testcasefile1: null,
        testcasefilename1: "",
        testcasefilename2: "",
        testcasefile2: null,}
      ]
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.ID = this.ID.bind(this);
    this.extension = this.extension.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDtchange =this.onDtchange.bind(this);
  }
  ID = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  };
  onSubmit = (e) => {
    e.preventDefault();
  const newContest = {
    contestname : this.state.contestname,
    contestdate : this.state.selecteddate,
    contestid   : this.state.contestId,
    questionno  : this.state.question.length,
    question    : this.state.question,
    };
    console.log(newContest);
    axios.post("http://localhost:5000/api/contest/create",newContest)
    .then(res=>{
      console.log(res);
      if(res.status===200){
        this.props.history.push("/admindashboard");
      }
    })
    .catch(err =>{
      console.log(err);
    })
  };
  handleDateChange = (e, date, target) => {
    console.log(e, date, target);
    this.state.selecteddate = e;
  };
  extension = (e) => {
    e.preventDefault();
    this.setState({
      questionno: this.state.questionno+1
    })
    this.setState((prevState) => ({
      question: [...prevState.question,{
        questiontitle: "",
        question: "",
        testcasefile1: null,
        testcasefilename1: "",
        testcasefilename2: "",
        testcasefile2: null,}]
    }));
  };
  onChange = (e) => {

    this.setState({ [e.target.id]: e.target.value });
  };
  onDtchange = (e) => {
    let question = this.state.question;
    question[e.target.id.slice(8,9)].questiontitle=e.target.value;
    this.setState({
      question: question,
    })
  }
  onDqchange = (e) => {
    let question = this.state.question;
    question[e.target.id.slice(8,9)].question=e.target.value;
    this.setState({
      question: question,
    })
  }
  onUpload1 = (e) =>{
    let question = this.state.question;
    let testcasefile1 = null;
    let reader = new FileReader();
    let file = e.target.files[0];
    question[this.state.questionno-1].testcasefilename1=e.target.files[0].name;
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      testcasefile1 = reader.result.split(",").pop();
      question[this.state.questionno-1].testcasefile1 = testcasefile1
    }
    this.setState({
      question: question,
    })
    console.log(this.state);
  }
  onUpload2 = (e) =>{
    let question = this.state.question;
    let testcasefile2 = null;
    let reader = new FileReader();
    let file = e.target.files[0];
    question[this.state.questionno-1].testcasefilename2=e.target.files[0].name;
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      testcasefile2 = reader.result.split(",").pop();
      question[this.state.questionno-1].testcasefile2 = testcasefile2
    }
    this.setState({
      question: question,
    })
    console.log(this.state);
  }
  render() {
    let question = [...this.state.question]
    return (
      <div style={{ minHeight: 500 }} className="container">
        <div className="row">
          <div className="offset-1 col-10">
            <Card style={{ backgroundColor: "#f7f7f7" }}>
              <CardContent>
                <form noValidate>
                  <div className="row">
                    <div className="offset-4 col-3">
                      <Input
                        onChange={this.onChange}
                        value={this.state.contestname}
                        //error={errors.contestName}
                        id="contestname"
                        type="text"
                        placeholder="NAME OF CONTEST"
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="row">
                    <div className="col-3">
                      <Input
                        onChange={this.onChange}
                        value={this.state.duration}
                        //error={errors.duration}
                        id="duration"
                        type="text"
                        placeholder="Duration Of Contest in hrs"
                      />
                    </div>
                    <div className="offset-1">
                      <DateTimePicker id="selecteddate" name="selecteddate" onChange={this.handleDateChange} value={this.state.selecteddate} />
                    </div>
                    <div className="offset-1">
                      <Label style={{ fontSize: 20 }}>
                        <b>Contest ID: </b>
                        <em>{this.state.contestId}</em>
                      </Label>
                    </div>
                  </div>
                  {question.map((val,idx)=>{
                    let questID = `question${idx}`;
                    return (
                      <div className="container">
                        <br />
                        <div className="row">
                          <div className="col-1">
                            <Label>
                              <b>{idx+1}</b>
                            </Label>
                          </div>
                          <div className="col-3">
                            <Input
                              placeholder="Question Title"
                              id={`${questID}`}
                              data-id={idx}
                              name={`${questID}`}
                              onChange={this.onDtchange}
                              value={this.state.question[idx].questiontitle}
                            />
                          </div>
                          <div className="col-8">
                            <TextareaAutosize
                              minRows={4}
                              maxRows={4}
                              data-id={idx}
                              id={`${questID}`}
                              name={`${questID}`}
                              style={{ width: "inherit" }}
                              placeholder="Question"
                              onChange={this.onDqchange}
                              value={this.state.question[idx].question}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-2">
                            <Label>TestCases</Label>
                          </div>
                          <div className="col-5">
                            <input
                              type="file"
                              dataid={idx}
                              value={this.state.testcasefile1}
                              name={`${questID}`}
                              id={`${questID}`}
                              onChange={this.onUpload1}
                            />
                          </div>
                          <div className="col-5">
                            <input
                              type="file"
                              dataid={idx}
                              value={this.state.testcasefile2}
                              name={`${questID}`}
                              id={`${questID}`}
                              onChange={this.onUpload2}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="row">
                    <div className="offset-10">
                      <Button onClick={this.extension}>
                        <Fab color="primary" aria-label="add">
                          <AddIcon />
                        </Fab>
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="outlined"
                    type="submit"
                    color="primary"
                    onClick={this.onSubmit}
                  >
                    Create
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
