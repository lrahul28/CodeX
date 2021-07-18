import React, { Component } from "react";
import Output from "./OutputTab";
import { Box, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import "./inputoutput.css";
class Tabs extends React.Component{
  state ={
    activeTab: this.props.children[0].props.label
  }
  changeTab = (tab) => {

    this.setState({ activeTab: tab });
  };
  render(){
    
    let content;
    let buttons = [];
    return (
      <div className="out">
        {React.Children.map(this.props.children, child =>{
          buttons.push(child.props.label)
          if (child.props.label === this.state.activeTab) content = child.props.children
        })}
         
        <TabButtons activeTab={this.state.activeTab} buttons={buttons} changeTab={this.changeTab}/>
        <div className="tab-content"><div className="container">
          {content}</div></div>
        
      </div>
    );
  }
}

const TabButtons = ({buttons, changeTab, activeTab}) =>{
   
  return(
    <div className="tab-buttons">
    {buttons.map(button =>{
       return <button className={button === activeTab? 'active outputbutton': 'outputbutton'} onClick={()=>changeTab(button)}>{button}</button>
    })}
    </div>
  )
}

const Tab = props =>{
  return(
    <React.Fragment>
      {props.children}
    </React.Fragment>
  )
}
 

class Inputoutput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e, value) => {
    this.setState({
      value: value,
    });
  };

  getInputTestCases() {
    var buffer = [];
    if (this.props.testcases !== "")
      buffer.push(
        <input
          type="text"
          className="OutputTextInput"
          key={1}
          disabled={true}
          value={this.props.testcases.split(/[\s \n]+/)}
        />
      );
    else {
      buffer.push(
        <input
          type="text"
          className="OutputTextInput"
          key={1}
          disabled={true}
          value="No Test Inputs Given"
        />
      );
    }
    return buffer;
  }
  render() {
    console.log(this.props);
    if (this.props.submissionStarted)
      return (
          <div className="outtabs">
          <Tabs
            className="out"
            value={this.state.value}
            style={{ backgroundColor: "#FFA107" }}
          >
            <Tab
              label="STDIN"
              buttonStyle={{ backgroundColor: "#4d86cf" }}
            >
              <div>
              {this.getInputTestCases()}
              </div>
            </Tab>
            <Tab
              label="STDOUT"
              buttonStyle={{ backgroundColor: "#4d86cf" }}
            >
              <Output
                  buttonDisabled={this.props.buttonDisabled}
                  stdOut={this.props.stdOut}
                  stdErr={this.props.stdErr}
                  compileError={this.props.compileError}
                  runtime={this.props.runtime}
                  memory={this.props.memory}
                  message={this.props.message}
                  codeStatus={this.props.codeStatus}
          />
            </Tab>
          </Tabs>
          </div>
      );
    else {
      return <p> </p>;
    }
  }
}

export default Inputoutput;
