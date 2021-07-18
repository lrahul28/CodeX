import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/auth.actions";
import classnames from "classnames";
import { Button, MenuItem, Select } from "@material-ui/core";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname:"",
      email: "",
      password: "",
      password2: "",
      userType: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to Home
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/Home");
    }
  }
componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSelect = e => {
    this.setState({[e.target.name]: e.target.value});
  }
onSubmit = e => {
    e.preventDefault();
const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      userType: this.state.userType,
      password: this.state.password,
      password2: this.state.password2
    };
this.props.registerUser(newUser, this.props.history); 
  };
render() {
    const { errors } = this.state;
return (<div className="log">
      <br /> <br />
      <div className="container" style={{backgroundColor:"white", width:400,marginLeft:20,paddingLeft:10}}>
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left"></i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col sm-12">
                <input
                  onChange={this.onChange}
                  value={this.state.firstname}
                  error={errors.firstname}
                  id="firstname"
                  type="text"
                  className={classnames("", {
                    invalid: errors.firstname
                  })}
                />
                <label htmlFor="name">First Name</label>
                <span>{errors.firstname}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.lastname}
                  error={errors.lastname}
                  id="lastname"
                  type="text"
                  className={classnames("", {
                    invalid: errors.lastname
                  })}
                />
                <label htmlFor="lastname">LastName</label>
                <span >{errors.lastname}</span>
              </div>
              
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span>{errors.email}</span>
              </div>
              <div className="input-field col s12">
              <Select
              labelId="demo-simple-select-label"
              id="userType"
              value={this.state.userType}
              onChange={this.onSelect}
              name="userType"
              >
            <MenuItem value={"admin"}>admin</MenuItem>
            <MenuItem value={"student"}>student</MenuItem>
          </Select>
          </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span >{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span >{errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <Button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  variant="contained"
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </Button>
              </div>
            </form>
            <br />
            <br />
          </div>
        </div>
      </div></div>
    );
  }
}



Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));