import React, { Component } from "react";
import {
  Collapse,
  Nav,
  NavbarToggler,
  NavItem,
  Navbar,
  Button,
} from "reactstrap";
import MenuItems from "./MenuItem";
import { Link, NavLink, Redirect, useHistory } from "react-router-dom";
import "./Nav_bar.css"; 
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/auth.actions";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
      button: "Login/SignUp"
      //history: useHistory(),
    };
    this.toggleNav = this.toggleNav.bind(this);
  }
  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }
  render() {
    return (
      <div className="navi">
        <Navbar className="" expand="md">
          <div className="container">
            <img className="logo" src={require("../assets/css/default.png")} alt="Logo" />
            <NavbarToggler onClick={this.toggleNav} />
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav className="menu ml-auto" navbar>
                {MenuItems.map((item) => {
                  if(this.props.auth.isAuthenticated===true){
                    if(item.title!=="DashBoard"){
                  return (
                    <NavItem>
                      <NavLink
                        style={{ textDecoration: "none", fontSize: 22 }}
                        to={item.url}
                        className={item.cName}
                      >
                        <span> {item.icon}</span>
                        {item.title}
                      </NavLink>
                    </NavItem>
                  );
                }
                else{
                  return (
                    <NavItem>
                      <NavLink
                        style={{ textDecoration: "none", fontSize: 22 }}
                        to={this.props.auth.user.userType=="admin"?"/admindashboard":"/dashboard"}
                        className={item.cName}
                      >
                        <span> {item.icon}</span>
                        {item.title}
                      </NavLink>
                    </NavItem>
                  );
                }
                  }
                  else{
                    if(item.title!=="DashBoard"){
                    return (
                      <NavItem>
                        <NavLink
                          style={{ textDecoration: "none", fontSize: 22 }}
                          to={item.url}
                          className={item.cName}
                        >
                          <span> {item.icon}</span>
                          {item.title}
                        </NavLink>
                      </NavItem>
                    );
                    }
                  }
                })}
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Button
                    className="nav-links"
                    href="/login"
                    onClick={this.props.auth.isAuthenticated===true?this.props.logoutUser:null}
                  >
                    {<span className="fa fa-sign-in fa-lg">{this.props.auth.isAuthenticated===true?this.props.auth.user.name:"Login/SignUp"}</span>}
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    );
  }
}
NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(NavBar);
