import React,{Component} from 'react'
import AutoComplete from '@material-ui/lab/AutoComplete'
import {ProgrammingTopics} from './ProgrammingTopics'
import { Chip, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Col, Row } from 'reactstrap';


const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

class ShowSaveTags extends Component{
  constructor(){
    super()
    this.state={
      searchText: '',
    }
  }

  renderTagChips = () =>{
    var buffer = []
    for(var i=0; i<this.props.snippetTags.length;i++){
      buffer.push(
        <Col xs={5} sm={5} md={5} lg={4} key={Date.now()+i}>
        <div style={styles.wrapper}>
        <Chip
          onRequestDelete={this.props.removeSnippetTag.bind(this,i)}
          style={styles.chip}
        >
        {this.props.snippetTags[i]}
        </Chip>
        </div>
        </Col>
      )
    }
    return buffer
  }

  handleUpdateInput = (searchText) => {
    let index = ProgrammingTopics.indexOf(searchText)
    this.setState({
      searchText: searchText,
    });
    if(index !== -1)
    {
          this.props.addSnippetTag(ProgrammingTopics[index])
          this.setState({
            searchText:'',
          })
    }
  };


  render(){
    return(
      <div>
      <Grid fluid>
      <Row start ="xs" bottom="xs">
      {this.renderTagChips()}
      <Col xs={4} sm={4} md={4} lg={3}>
      <AutoComplete
        hintText="Add tags to your program"
        openOnFocus={true}
        filter={AutoComplete.fuzzyFilter}
        dataSource={ProgrammingTopics}
        maxSearchResults={5}
        underlineShow={false}
        searchText={this.state.searchText}
        onUpdateInput={this.handleUpdateInput}
      />
      </Col>
      </Row>
      <Row start="xs">
      <TextField
      hintText="Add some description about this snippet"
      value = {this.props.description}
      onChange = {this.props.handleDescriptionChange}
      multiLine={true}
      rows={1}
      rowsMax={4}
      style={{width:'80%'}}
      />
      </Row>
      </Grid>
      </div>
    )
  }
}

export default ShowSaveTags
