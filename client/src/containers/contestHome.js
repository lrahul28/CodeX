import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Axios from 'axios';
import EditorMain1 from './Editor/EditorMain1';

export default class ContestHome extends Component{
    constructor(props){
        super(props);
        this.state={
          contestName: '',
          contestId: '',
          questionno: 0,
          question: [],
          questionName: ''
        }
        this.onQuestionSelect=this.onQuestionSelect.bind(this);
    }
    onQuestionSelect(e){
      console.log(e.target.value);
      this.setState({questionName: e.target.value},()=>{ console.log(this.state);});
    }
    componentDidMount(){
      const contest={
        contestname: this.props.contestname
      }
      console.log(contest);
      Axios.post("http://localhost:5000/api/contest/contest",contest)
      .then(res=>res.data)
      .then((res)=>{
        console.log(res);
        this.setState({
          contestName: res.contestname,
          contestId: res.contestId,
          questionno: res.questionno,
          question: res.question
        })
      })
      .catch((err)=>{
          console.log(err);
      });
    }
    render() {
    return (
    <div className="container" style={{width: "100%", minHeight: "500px"}}>
      <div>
    <h1>{this.state.contestName}</h1>
      </div>
      <br />
      <br />
      <br />
      {this.state.question.map(quest=>{
         return ( <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id={quest.questiontitle}
          >
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={<Checkbox value={quest.questiontitle} onClick={this.onQuestionSelect}/>}
              label={quest.questiontitle}
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="textSecondary">
              {quest.question}
            </Typography>
          </AccordionDetails>
        </Accordion>);
      })
      }
      <EditorMain1 contestName={this.state.contestName} questionName={this.state.questionName}/>
    </div>
  );
 }
}