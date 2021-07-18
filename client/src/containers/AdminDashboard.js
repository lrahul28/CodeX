import React, {Component} from 'react';
import CustomTabs from '../components/CustomTabs/CustomTabs';
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
import Tasks from '../components/Tasks/Tasks';
import { bugs, website, server } from "../variables/general";
import AssignmentIcon from '@material-ui/icons/Assignment';
import Code from "@material-ui/icons/Code";
import { Button } from '@material-ui/core';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/auth.actions";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

class AdminDashboard extends Component{
    constructor(props){
        super(props);
        this.state={
            contest: [],
            assignments: [],
            analysis: []
        }
        this.create = this.create.bind(this);
    }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };
    componentDidMount(){
        Axios.post("http://localhost:5000/api/contest/getcontests")
        .then(res=>res.data)
        .then((res)=>{
          let Names=[];
          console.log(res);
          res.map((contestData)=>{
          //if(contestData[0] < new Date())
            Names.push(contestData[1]);
          })
          this.setState({
            contest: Names,
            assignments: Names

          })
          console.log(this.state.contest);
        })
        .catch((err)=>{
            console.log(err);
        });

    };
    create = () =>{
      window.location.assign("/create"); 
    }
    render(){
        const { user } = this.props.auth;
        return (
            <div className="container valign-wrapper">
            <div className="row">
              <div className="col-12 center-align">
                <div className="row">
                  <div className="col-10">
                  <h4><b>Hey there, {this.props.auth.user.name}</b></h4> 
                </div>
                <div className="col-2">
                </div>
              </div>
            </div>
            </div>
            <br /><br /><br />
            <div className="offset-md-2">    
        <GridContainer item justify="center">
          <GridItem xs={12} sm={12} md={8}  >
            <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Assignments",
                  tabIcon: AssignmentIcon,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[]}
                      tasksIndexes={Array.from({length: this.state.assignments.length}, (_, index) => index)}
                      tasks={this.state.assignments}
                      userType={user.userType}
                      handleContest={this.props.handleContest}
                    />
                  )
                },
                {
                  tabName: "Contests",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[]}
                      tasksIndexes={Array.from({length: this.state.contest.length}, (_, index) => index )}
                      tasks={this.state.contest}
                      userType={user.userType}
                      handleContest={this.props.handleContest}
                    />
                  )
                },
                {
                    tabName: "Analysis",
                    tabIcon: Code,
                    tabContent: (
                      <Tasks
                        checkedIndexes={[]}
                        tasksIndexes={Array.from({length: this.state.analysis.length}, (_, index) => index)}
                        tasks={this.state.analysis}
                        userType={user.userType}
                        handleContest={this.props.handleContest}
                      />
                    )
                  }
              ]}
            />
          </GridItem>
          </GridContainer>
          </div>
          <div className="offset-11">
              <Button  onClick={this.create}>
              <Fab color="primary" aria-label="add">
              <AddIcon />
              </Fab>
              </Button>
          </div>
      </div>);
      }
}
AdminDashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(AdminDashboard);