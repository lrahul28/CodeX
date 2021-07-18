import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/auth.actions";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {bugs, website } from "../../variables/general"
import Tasks from "../../components/Tasks/Tasks";
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import AssignmentIcon from '@material-ui/icons/Assignment';
import Code from "@material-ui/icons/Code";
import { Button } from "@material-ui/core";
import Axios from "axios";
class Home extends Component {
  constructor(props){
    super(props);
    this.state={ 
      contest: [],
      assignments: [],
      analysis: []
    }
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
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth;
    console.log(this.props);
return (
      <div className="container valign-wrapper">
        <div className="row">
          <div className="col-12 center-align">
            <div className="row">
              <div className="col-10">
              <h4><b>Hey there, {user.name}</b></h4> 
            </div>
            <div className="col-2">
            </div>
          </div>
        </div>
        </div>
        <br /><br /><br />
        <div className="offset-md-2">
        <GridContainer item justify="center">
        <GridItem xs={12} sm={12} md={10}  >
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
                    userType={this.props.auth.userType}
                    handleContest={this.props.handleContest}
                  />
                )
              },
              {
                tabName: "Contests",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={Array.from({length: this.state.assignments.length}, (_, index) => index)}
                    tasks={this.state.contest}
                    userType={this.props.auth.userType}
                    handleContest={this.props.handleContest}
                  />
                )
              }
            ]}
          />
        </GridItem>
        </GridContainer>
        </div>
      </div>

    );
  }
}
Home.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Home);