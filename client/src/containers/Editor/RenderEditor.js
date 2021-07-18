import React, { Component } from "react";
import { modes, themes } from "./Utils";
import { Select, MenuItem, Grid } from "@material-ui/core";
import AceEditor from "react-ace";
import "brace/mode/jsx";
/*eslint-disable no-alert, no-console */
import "brace/ext/language_tools";
import "brace/ext/searchbox";
import { Col, Row } from "reactstrap";

modes.forEach((mode) => {
  require(`brace/mode/${mode.value}`);
  require(`brace/snippets/${mode.value}`);
});

themes.forEach((theme) => {
  require(`brace/theme/${theme.name}`);
});

class RenderEditor extends Component {
  menuItems(modes) {
    return modes.map((mode) => (
      <MenuItem key={mode.key} value={(mode.key==2 || mode.key==6)?mode.value+'1':mode.value}>
        {mode.name}
      </MenuItem>
    ));
  }

  menuThemes(themes) {
    return themes.map((theme) => (
      <MenuItem key={theme.value} value={theme.name}>
        {theme.name}
      </MenuItem>
    ));
  }

  render() {
    return (
      <div>
        <Grid fluid className="nogutter">
          <Row center="xs">
            <Col xs>
              <Select
                floatingLabelText="Language"
                value={this.props.language}
                onChange={this.props.setMode}
                style={{ textAlign: "left" }}
                underlineStyle={{ borderColor: "black" }}
                iconStyle={{ fill: "black" }}
                autoWidth={true}
                maxHeight={300}
              >
                {this.menuItems(modes)}
              </Select>
              <br /> <br />
            </Col>
            <Col xs>
              <Select
                floatingLabelText="Theme"
                value={this.props.theme}
                onChange={this.props.setTheme}
                underlineStyle={{ borderColor: "black" }}
                style={{ textAlign: "left" }}
                iconStyle={{ fill: "black" }}
                autoWidth={true}
              >
                {this.menuThemes(themes)}
              </Select>
              <br /> <br />
            </Col>
          </Row>
        </Grid>
        <AceEditor
          mode={this.props.mode}
          theme={this.props.theme}
          name="My_editor"
          style={{ width: "98%", marginLeft: "1%", height: "73vmin" }}
          onChange={this.props.onChange}
          value={this.props.value}
          fontSize={this.props.fontSize}
          showPrintMargin={this.props.showPrintMargin}
          showGutter={this.props.showGutter}
          highlightActiveLine={this.props.highlightActiveLine}
          editorProps={{ $blockScrolling: Infinity }}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          enableSnippets={true}
          showLineNumbers={true}
          tabSize={2}
        />
      </div>
    );
  }
}

export default RenderEditor;
