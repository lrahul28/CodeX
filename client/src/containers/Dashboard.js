import React, { Component } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import AssignmentIcon from '@material-ui/icons/Assignment';
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "../components/Grid/GridItem";
import GridContainer from "../components/Grid/GridContainer.js";
import Table from "../components/Table/Table.js";
import Tasks from "../components/Tasks/Tasks.js";
import CustomTabs from "../components/CustomTabs/CustomTabs.js";
import Danger from "../components/Typography/Danger.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardIcon from "../components/Card/CardIcon.js";
import CardBody from "../components/Card/CardBody.js";
import CardFooter from "../components/Card/CardFooter.js";

import { bugs, website, server } from "../variables/general";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../variables/charts.js";

import styles from "../assets/jss/material-dashboard-react/views/dashboardStyle";
import { extend } from "chartist";

const useStyles = makeStyles(styles);

class Dashboard extends Component{
  //const classes = useStyles();
  constructor(props){
    super(props);
    this.state={ 
      contest: [],
      assignments: [],
      analysis: []
    }
  }
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
  render(){
    console.log(this.props);
  return (
    <div className="offset-md-3">
      <h1>{this.props.auth}</h1>
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
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={this.state.assignments}
                    userType={this.props.auth.userType}
                  />
                )
              },
              {
                tabName: "Contests",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={this.state.contest}
                    userType={this.props.auth.userType}
                  />
                )
              }
            ]}
          />
        </GridItem>
        </GridContainer>
    </div>
  );
}
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  null
)(Dashboard);
