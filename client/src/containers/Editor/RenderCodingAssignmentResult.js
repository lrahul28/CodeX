import { Divider, Grid } from "@material-ui/core";
import React, { Component } from "react";
import { Col, Row } from "reactstrap";

class RenderCodingAssignmentResult extends Component {
  showRunStats = () => {
    var buffer = [];
    if (this.props.runtime !== "") {
      buffer.push(
        <div key={2}>
          <h5 className="summaryParagraph">
            Program RunTime : [
            {this.props.runtime ? this.props.runtime.toString() : ""}] in
            seconds
          </h5>
          <h5 className="summaryParagraph">
            Program Memory : [
            {this.props.memory ? this.props.memory.toString() : ""}] in bytes
          </h5>
        </div>
      );
    }
    return buffer;
  };

  renderOutput = () => {
    var buffer = [];
    if (this.props.assignmentStatus === "SUCCESS")
      buffer.push(
        <div className="shadow" key={1}>
          <fieldset>
            <h3 style={{ textAlign: "left" }}>
              Summary<hr></hr>
            </h3>
            <h4 className="summaryParagraph">All Test cases are passing</h4>
            {this.showRunStats()}
          </fieldset>
        </div>
      );
    else if (this.props.assignmentStatus === "TESTS_FAILED")
      buffer.push(
        <div className="shadow" key={1}>
          <fieldset>
            <h3 style={{ textAlign: "left" }}>
              Summary <hr></hr>
            </h3>
            <h4 className="summaryParagraph">
              Some of the test cases are failing
            </h4>
            <h4 className="summaryParagraph">Failed Test Case:</h4>
            <h5 className="summaryParagraph">
              StdIn:<hr></hr>
            </h5>
            <textarea
              key={2}
              className="OutputTextInput"
              disabled={true}
              value={this.props.expectedInput}
            />
            <h5 className="summaryParagraph">
              StdOut:<hr></hr>
            </h5>
            <textarea
              key={3}
              className="OutputTextInput"
              disabled={true}
              value={this.props.expected}
            />
            <Divider />
            <h5 className="summaryParagraph">Actual Output :</h5>
            <textarea
              key={4}
              className="OutputTextInput"
              disabled={true}
              value={this.props.actual}
            />
            <h5 className="summaryParagraph">
              {" "}
              TotalPassedTests : {this.props.passCount}{" "}
            </h5>
            <h5 className="summaryParagraph">
              {" "}
              TotalTestCases: {this.props.totalCount}{" "}
            </h5>
            <h5 className="summaryParagraph">
              {" "}
              FailedCase: {this.props.failedCase}
            </h5>
            {this.showRunStats()}
          </fieldset>
        </div>
      );
    else if (this.props.assignmentStatus === "COMPILER_ERROR")
      buffer.push(
        <div className="shadow" key={1}>
          <fieldset>
            <h3 style={{ textAlign: "left" }}>
              Summary<hr></hr>
            </h3>
            <h4 className="summaryParagraph">Compilation Failed</h4>
            <h5 className="summaryParagraph">Error :</h5>
            <textarea
              key={2}
              className="OutputTextInput"
              disabled={true}
              value={this.props.errorMessage}
            />
            {this.showRunStats()}
          </fieldset>
        </div>
      );
    else if (this.props.assignmentStatus === "TIME_OUT")
      buffer.push(
        <div className="shadow" key={1}>
          <fieldset>
            <h3 style={{ textAlign: "left" }}>
              Summary<hr></hr>
            </h3>
            <h4 className="summaryParagraph">Request Time Out</h4>
            <h5 className="summaryParagraph">Error :</h5>
            <textarea
              key={2}
              className="OutputTextInput"
              disabled={true}
              value={this.props.errorMessage}
            />
          </fieldset>
        </div>
      );
    else if (this.props.assignmentStatus === "RUNTIME_ERROR")
      buffer.push(
        <div className="shadow" key={1}>
          <fieldset>
            <h3 style={{ textAlign: "left" }}>
              Summary<hr></hr>
            </h3>
            <h4 className="summaryParagraph">RunTime Exception</h4>
            <h5 className="summaryParagraph">
              StdIn:<hr></hr>
            </h5>
            <textarea
              key={2}
              className="OutputTextInput"
              disabled={true}
              value={this.props.expectedInput}
            />
            <h5 className="summaryParagraph">Error :</h5>
            <textarea
              key={3}
              className="OutputTextInput"
              disabled={true}
              value={this.props.errorMessage}
            />
            {this.showRunStats()}
          </fieldset>
        </div>
      );
    return buffer;
  };

  render() {
    return (
      <div className="renderCodingAssignment">
        <Grid fluid>
          <Row around="xs">
            <Col xs={11} sm={11} md={9} lg={8}>
              {this.renderOutput()}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default RenderCodingAssignmentResult;
