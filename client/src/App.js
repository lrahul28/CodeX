import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/auth.actions";
import { Provider } from "react-redux";
import store from "./store";
import SignUp from "./containers/SignUp";
import Login from "./containers/Login/index";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./containers/Home"
import Header from "./components/Header";
import LeaderboardMain from "./containers/LeaderBoard";
import EditorMain from "./containers/Editor/EditorMain";
import About from "./containers/Aboutus";
import Dashboard from "./containers/Home/index";
import Footer from "./containers/Footer";
import "./App.css";
import AdminDashboard from "./containers/AdminDashboard";
import ContestHome from "./containers/contestHome";
import AdminRoute from "./components/AdminRoute";
import Create from "./containers/Create";
import Axios from "axios";
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {

    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      contest: [],
      questionName: "",
    }
    this.handleContest=this.handleContest.bind(this);
    this.handleQuestion=this.handleQuestion.bind(this);
  }
  handleContest= (routerProps) =>{
    console.log(routerProps);
    /*this.setState({
      contestName: e.target.value
    })*/
    let Id= parseInt(routerProps.match.params.id)
    let contestname =this.state.contest[Id];
    console.log(contestname);
    //return <ContestHome />//contestname={contestname} />
    return (contestname ? <ContestHome contestname={contestname} /> : <div>NOTFOUND</div> )
  }
  handleQuestion= (value) =>{
    this.setState({
      questionName: value
    })
  }
  componentDidMount(){
    Axios.post("http://localhost:5000/api/contest/getcontests")
    .then(res=>res.data)
    .then((res)=>{
      let Names=[];
      console.log(res);
      res.map((contestData,index)=>{
      //if(contestData[0] < new Date())
        Names.push(contestData[1]);
      })
      this.setState({
        contest: Names,
      })
      console.log(this.state.contest[0]);
    })
    .catch((err)=>{
        console.log(err);
    });
  }
  render() {
    return ( 
      <Provider store={store}>
        
        <Router>
          <div className="App">
          <Header />
          <Switch>
            <Route path="/home"  component={Home} />
            <Route path="/leaderboard"  component={LeaderboardMain} />
            <Route path="/editor"  component={EditorMain} />
            <Route path="/aboutus"  component={About} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={SignUp}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/contest/:id" component= {routerProps=> this.handleContest(routerProps)} />
            <AdminRoute path="/admindashboard" component={AdminDashboard} />
            <AdminRoute path="/create" component={Create} />
            <Redirect to="/home" />
            </Switch>
            <Footer />
          </div>
        </Router>
        
      </Provider>
    );
  }
}
export default App;