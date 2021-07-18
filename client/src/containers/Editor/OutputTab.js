import React, { Component } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid, TextareaAutosize } from "@material-ui/core";
import { Col, Row } from "reactstrap";

class OutputTab extends Component {
  printStats() {
    var buffer = [];
    buffer.push(
      <TextareaAutosize
        minRows={1}
        maxRows={1}
        style={{ width: "inherit" }}
        type="text"
        className="OutputTextInput"
        key={1}
        disabled={true}
        value={"Runtime : " + this.props.runtime + " s"}
        />
    );
    buffer.push(
      <TextareaAutosize
        minRows={1}
        maxRows={1}
        style={{ width: "inherit" }}
        type="text"
        className="OutputTextInput"
        key={2}
        disabled={true}
        value={"Memory : " + this.props.memory + " bytes"}
        />
    );
    return buffer;
  }

  giveConsoleOutput() {
    var buffer = [];
    var stdoutstring = "";
    var stderrstring = "";
    if (
      this.props.compileError !== ""
    )
      buffer.push(
        <TextareaAutosize
        minRows={4}
        maxRows={4}
        style={{ width: "500px" }}
        type="text"
        className="OutputTextInput"
        key={1}
          disabled={true}
          value={this.props.compileError}
        />
      );
    else if (
      this.props.codeStatus!=="AC" 
    ) {
      stderrstring = this.props.compileError;
      buffer.push(
        <TextareaAutosize
        minRows={4}
        maxRows={4}
        style={{ width: "500px" }}
        type="text"
        className="OutputTextInput"
        key={1}
          disabled
          value={stderrstring}
        />
      );
    } else {
      if (typeof this.props.stdOut === "string") {
        stdoutstring = this.props.stdOut;
      } else if (this.props.stdOut.length === 1)
        stdoutstring = this.props.stdOut[0];
      else {
        for (let i = 0; i < this.props.stdOut.length; i++) {
          stdoutstring =
            stdoutstring +
            "CASE " +
            (i + 1) +
            ":\n" +
            this.props.stdOut[i] +
            "\n";
        }
      }
      buffer.push(
        <TextareaAutosize
        minRows={4}
        maxRows={4}
        style={{ width: "700px" }}
        type="text"
        className="OutputTextInput"
        key={1}
          disabled
          value={stdoutstring}
        />
      );
    }
    return buffer;
  }

  render() {
    console.log(this.props);
    if (this.props.buttonDisabled)
      return (
        <Grid fluid>
          <Row center="xs" className="RefreshIndicator">
            <Col xs>
              <br />
              <CircularProgress
                size={50}
                left={45}
                top={0}
                loadingColor="#FF9800"
                status="loading"
                className="refresh"
              />
              <br />
              <br />
              <br />
            </Col>
          </Row>
        </Grid>
      );
    else {
      return (
        <div>
          {this.giveConsoleOutput()}
          {this.printStats()}
        </div>
      );
    }
  }
}
export default OutputTab;
