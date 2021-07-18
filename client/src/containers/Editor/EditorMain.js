import React, { Component } from "react";
import Loadable from "react-loadable";
import Button from "@material-ui/core/Button";
import { HelloWorldTemplates } from "./HelloWorldTemplates";
import { editorModes, hackerEarthLangNotation } from "./Utils";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import Loading from "../../components/loader";
import Checkbox from "@material-ui/core/Checkbox";
import { Dialog, Grid } from "@material-ui/core";
import { Col, Row } from "reactstrap";
import { TextArea } from "semantic-ui-react";
import {FaCodepen} from "react-icons/fa"
import Axios from "axios";
var properties = require("../../properties.json");

const RenderEditor = Loadable({
  loader: () => import("./RenderEditor"),
  loading: Loading,
  timeout: 10000,
});
const ShowSaveTags = Loadable({
  loader: () => import("./ShowSaveTags"),
  loading: Loading,
  timeout: 10000,
});
const RenderCodingAssignmentResult = Loadable({
  loader: () => import("./RenderCodingAssignmentResult"),
  loading: Loading,
  timeout: 10000,
});
const Inputoutput = Loadable({
  loader: () => import("./Inputoutput"),
  loading: Loading,
  timeout: 10000,
});

const defaultValue = `console.log("Welcome to CodeX");`;

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      codeStatus: "",
      compileError: "",
      stdErr: "",
      stdOut: "",
      message: "",
      buttonDisabled: false,
      submissionStarted: false,
      value: defaultValue,
      languageValue: "JAVASCRIPT_NODE",
      testcases: "",
      language: "javascript",
      theme: "solarized_dark",
      mode: "javascript",
      fontSize: 14,
      showGutter: true,
      showPrintMargin: false,
      highlightActiveLine: true,
      checked: false,
      assignmentStatus: "",
      expected: "",
      actual: "",
      passCount: "",
      totalCount: "",
      failedCase: "",
      errorMessage: "",
      saveDialog: false,
      submitConfirm: false,
      timeout: 5000,
      isIdle: false,
      totalActiveTime: null,
      disabledLanguage: false,
      runtime: "",
      memory: "",
      description: "",
      snippetTags: [],
    };
    this.setTheme = this.setTheme.bind(this);
    this.setMode = this.setMode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitRequest = this.submitRequest.bind(this);
    this.updateCheck = this.updateCheck.bind(this);
    this.changeTestCases = this.changeTestCases.bind(this);
  }
  changeTestCases(event) {
    this.setState({
      testcases: event.target.value,
    });
  }

  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  openSaveDialog = () => {
    if (this.state.value.trim() === "")
      console.log("Source code cannot be empty", "error");
    else {
      this.setState({
        saveDialog: true,
      });
    }
  };

  onChange(newValue) {
    this.setState({
      value: newValue,
      source: newValue,
      submissionStarted: false,
    });
  }

  getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  buildMap = (obj) => {
    return Object.keys(obj).reduce(
      (map, key) => map.set(key, obj[key]),
      new Map()
    );
  };

  updateCheck() {
    this.setState((oldState) => {
      return {
        checked: !(oldState.checked),
      };
    });
  }

  setTheme = (e, index, value) => {
    this.setState({
      theme: index.props.children,
    });
  };
  setMode = (e, index, value) => {
    value = index.props.children;
    console.log(value);
    var map = this.buildMap(HelloWorldTemplates);
    var editorModesMap = this.buildMap(editorModes);
    var hackerEarthLangNotationMap = this.buildMap(hackerEarthLangNotation);
    console.log(hackerEarthLangNotationMap);
    this.setState({
      languageValue: hackerEarthLangNotationMap.get(value),
      language: index.props.value,
      mode: editorModesMap.get(value),
      value: map.get(value),
      source: map.get(value),
    });
  };

  scrollToBottom = () => {
    this.endDiv.scrollIntoView({ behavior: "smooth" });
  };

  submitRequest() {
    if (this.state.value.trim() === "")
      console.log("Source code cannot be empty", "error");
    else {
      this.setState({
        buttonDisabled: true,
        submissionStarted: true,
      });
      this.scrollToBottom();
      Axios.post("http://" + properties.getHostName + ":5000/api/editor/run",JSON.stringify({
        source: this.state.value,
        lang: this.state.languageValue,
        testcases: this.state.testcases,
      }),{ headers: {
        mode: "cors",
        "Content-Type": "application/json",
      },
      credentials: "include"})
        .then((response) => {
          if (response.status === 200) return JSON.parse(response["data"]);
          else if (response.status === 500) {
           console.log(
              "Sorry something went wrong or you might not be connected to internet",
              "error"
            );
          }
        })
        .then((response) => {
          if (response) {
            console.log(response);
            this.setState(
              {
                buttonDisabled: false,
                compileError: response.compile_status=="OK"?"":response.compile_status,
                stdOut: response.compile_status=="OK"?response.run_status.output:null,
                runtime: response.compile_status=="OK"?response.run_status.time_used:0,
                memory: response.compile_status=="OK"?response.run_status.memory_used:0,
                codeStatus: response.run_status.status,
              },
              function callback() {
                this.scrollToBottom();
              }
            );
            console.log(this.state);
          } else {
            this.setState({
              buttonDisabled: false,
            });
          }
        });
    }
  }

  compileAndRun = () => {
    if (this.props.source.trim() === "")
      console.log("Source code cannot be empty", "error");
    else {
      this.setState({
        buttonDisabled: true,
        submissionStarted: true,
      });
      this.scrollToBottom();
      fetch(
        "http://" +
          properties.getHostName +
          ":8080/assignments/jdoodle/assignment/compile",
          {
          method: "POST",
          headers: {
            mode: "cors",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            source: this.props.source,
            lang: this.props.languageValue,
            assignmentid: this.props.assignmentid,
            question: this.props.question,
          }),
        }
      )
        .then((response) => {
          if (response.status === 200) return response.json();
          else if (response.status === 500) {
            console.log("Sorry something went wrong ", "error");
          }
        })
        .then((response) => {
          console.log(response);
          if (response)
            this.setState(
              {
                assignmentStatus: response.codingAssignmentStatus,
                expected: response.expected,
                expectedInput: response.expectedInput,
                actual: response.actual,
                passCount: response.passCount,
                totalCount: response.totalCount,
                failedCase: response.failedCase,
                errorMessage: response.errorMessage,
                runtime: response.runtime,
                memory: response.memory,
                buttonDisabled: false,
              },
              function callback() {
                this.scrollToBottom();
              }
            );
          else {
            this.setState({
              buttonDisabled: false,
            });
          }
        })
        .catch((response) => {
         console.log("Please login before you compile your program", "error");
          this.props.history.push("/");
        });
    }
  };

  addSnippetTag = (tag) => {
    var currentTags = this.state.snippetTags.slice();
    if (currentTags.length >= 4) {
     console.log("You can add only 3 tags per snippet", "warning");
    } else {
      currentTags.push(tag);
      this.setState({
        snippetTags: currentTags,
      });
    }
  };
  removeSnippetTag = (index) => {
    var currentTags = this.state.snippetTags.slice();
    currentTags.splice(index, 1);
    console.log(currentTags.toString());
    this.setState({
      snippetTags: currentTags,
    });
  };

  showInputTextArea() {
    var buffer = [];
    if (this.state.checked)
      buffer.push(
        <TextArea
          key={1}
          placeholder="Enter Your Custom Input(Separated by space and newline) "
          rows="10"
          cols="40"
          className="testcases"
          value={this.state.testcases}
          onChange={this.changeTestCases}
          autoComplete="off"
        />
      );
    return buffer;
  }
  showCheckBoxAndCompile = () => {
    var buffer = [];
    let styles={backgroundColor:"#078282FF"}
    if (typeof this.props.state === "undefined") {
      buffer.push(
        
<div id="edit">
<h1 style={{fontSize:70,color:"#312F2F",fontFamily:"Lucida Console, Monaco, monospace",marginLeft:0,marginTop:0}}><FaCodepen  />CODEX EDITOR</h1><br/><br/><br/><br/>

        <div className="Editor" style={styles} key={1}>
          <RenderEditor
            value={this.state.value}
            theme={this.state.theme}
            mode={this.state.mode}
            fontSize={this.state.fontSize}
            showGutter={this.state.showGutter}
            showPrintMargin={this.state.showPrintMargin}
            highlightActiveLine={this.state.highlightActiveLine}
            setTheme={this.setTheme}
            setMode={this.setMode}
            language={this.state.language}
            onChange={this.onChange}
          />
          <br />
          <Grid fluid>
            <Row center="xs">
              <Col xs={11} sm={11} md={6} lg={6}>
                <Checkbox
                  label="Test Against Custom Input"
                  checked={this.state.checked}
                  onClick={this.updateCheck}
                  labelStyle={{ color: "#30b55b" }}
                  style={{ maxWidth: 250 }}
                />
                {this.showInputTextArea()}
              </Col>
              <Col xs={6} sm={6} md={3} lg={3}>
                <Button
                  primary={true}
                  labelStyle={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "1em",
                  }}
                  style={{ backgroundColor: "#30b55b" }}
                  onClick={this.openSaveDialog}
                >
                  Save
                </Button>
              </Col>
              <Col xs={6} sm={6} md={3} lg={3}>
                <Button
                  style={{
                    verticalAlign: "middle",
                    border: "0.05em solid #30b55b",
                    color: "#30b55b",
                    borderRadius: "1vmax",
                  }}
                  disabled={this.state.buttonDisabled}
                  onClick={this.submitRequest}
                >
                  Compile & Run
                </Button>
              </Col>
            </Row>
          </Grid>

          <br />
          <br />
          <Inputoutput
            submissionStarted={this.state.submissionStarted}
            buttonDisabled={this.state.buttonDisabled}
            compileError={this.state.compileError}
            stdErr={this.state.stdErr}
            stdOut={this.state.stdOut}
            testcases={this.state.testcases}
            runtime={this.state.runtime}
            memory={this.state.memory}
            message={this.state.message}
            codeStatus={this.state.codeStatus}
          />
          <br />
          <br />
          <br />
          <br />
        </div>
        </div>
      );
    } else if (this.props.state === "Assignment") {
      buffer.push(
        <div key={1}>
          <RenderEditor
            value={this.props.source}
            theme={this.props.theme}
            mode={this.props.mode}
            fontSize={this.state.fontSize}
            showGutter={this.state.showGutter}
            showPrintMargin={this.state.showPrintMargin}
            highlightActiveLine={this.state.highlightActiveLine}
            setTheme={this.props.setTheme}
            setMode={this.props.setMode}
            disabledLanguage={this.props.disabledLanguage}
            language={this.props.language}
            onChange={this.props.onChange}
          />
          <br />
          <Grid fluid className="nogutter">
            <Row center="xs" top="xs">
              <Col xs>
                <Button
                  variant="contained"
                  label="Compile & Run"
                  primary={true}
                  disabled={this.state.buttonDisabled}
                  onClick={this.compileAndRun}
                />
              </Col>
            </Row>
          </Grid>
          <br />
          <br />
          <br />
          <RenderCodingAssignmentResult
            assignmentStatus={this.state.assignmentStatus}
            expected={this.state.expected}
            expectedInput={this.state.expectedInput}
            actual={this.state.actual}
            errorMessage={this.state.errorMessage}
            runtime={this.state.runtime}
            memory={this.state.memory}
            failedCase={this.state.failedCase}
            passCount={this.state.passCount}
            totalCount={this.state.totalCount}
          />
        </div>
      );
    }
    return buffer;
  };
  saveCodeSnippet = () => {
    if (this.state.snippetTags.length === 0)
     console.log("Please add atleast one tag", "warning");
    else {
      this.handleClose();
      fetch(
        "http://" +
          properties.getHostName +
          ":8080/assignments/codeeditor/save",
        {
          method: "POST",
          headers: {
            mode: "cors",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            source: this.state.value,
            language: this.state.mode,
            tags: this.state.snippetTags,
            description: this.state.description,
            email: this.props.loggedinuser,
          }),
        }
      )
        .then((response) => {
          if (response.status === 201) {
           console.log("Snippet saved successfully", "success");
            this.setState({
              description: "",
              snippetTags: [],
            });
            this.props.handleReloadListChange();
          } else if (response.status === 500)
           console.log(
              "something is not right please try again later",
              "error"
            );
        })
        .catch((response) => {
         console.log(
            "Your session expired please copy your code to notepad and refresh the page"
          );
        });
    }
  };

  handleClose = () => {
    this.setState({
      saveDialog: false,
    });
  };
  render() {
    const actions = [
      <Button primary={true} onClick={this.handleClose}>
        Cancel
      </Button>,
      <Button primary={true} onClick={this.saveCodeSnippet}>
        Save
      </Button>,
    ];
    return (
      <div>
        {this.showCheckBoxAndCompile()}
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            this.endDiv = el;
          }}
        ></div>
        <Dialog
          title="Save Code Snippet"
          modal={false}
          actions={actions}
          open={this.state.saveDialog}
          titleStyle={{ textAlign: "center", color: "rgb(162,35,142)" }}
          onRequestClose={this.handleClose}
        >
          <ShowSaveTags
            snippetTags={this.state.snippetTags}
            removeSnippetTag={this.removeSnippetTag}
            addSnippetTag={this.addSnippetTag}
            handleDescriptionChange={this.handleDescriptionChange}
            description={this.state.description}
          />
        </Dialog>
      </div>
    );
  }
}
Editor.contextTypes = {
  router: PropTypes.object,
};

export default withRouter(Editor);