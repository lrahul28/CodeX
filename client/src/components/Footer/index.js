import React from "react";
import "./styles.css";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

/**
 * @author EshwarCVS
 * @function Footer
 **/

function Copyright() {
  return (
    <Typography variant="body" className="body">
      {"Copyright © "}
      <Link color="inherit" href="https://angel.co/company/invybiz">
        INVYBIZ
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = (props) => {
  return (
    <footer className="footer">
      <div classname="container" style={{ color: "white" }}>
        <div className="row">
          <div
            className="col-12 col-sm-3 "
            style={{ alignSelf: "center" }}
          >
            <img className="img-fluid" src="assets/logo337.png" alt="INVYBIZ" />
          </div>
          <div className="col-12 col-sm-3">
            <h3>InvyBiz</h3>
            <p style={{ color: "#bbbbbb" }}>
              is a smart investment platform that helps you find the right
              businesses from the ocean of opportunities across the world.
            </p>
            <h3>Follow us</h3>
            <div className="social">
              <a
                className="btn btn-social-icon btn-facebook mr-1"
                style={{
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                  color: "rgb(101, 146, 230)",
                }}
                href="http://www.facebook.com/profile.php?id="
              >
                <i className="fa fa-facebook"></i>
              </a>
              <a
                className="btn btn-social-icon btn-twitter mr-1"
                style={{
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                  color: "rgb(34, 165, 229)",
                }}
                href="http://twitter.com/"
              >
                <i className="fa fa-twitter"></i>
              </a>
              <a
                className="btn btn-social-icon btn-instagram mr-1"
                style={{
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                  color: "rgb(228, 63, 63)",
                }}
                href="http://instagram.com/"
              >
                <i className="fa fa-instagram"></i>
              </a>
              <a
                className="btn btn-social-icon btn-linkedin mr-1"
                style={{
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                  color: "rgb(68, 121, 217)",
                }}
                href="http://www.linkedin.com/in/"
              >
                <i className="fa fa-linkedin"></i>
              </a>
            </div>
          </div>
          <div id='Links' className="col-12 col-sm-3">
            <h3>Company</h3>
            <ul  className="list-unstyled" style={{ fontSize: 18}}>
              <li>
                <a style={{color: 'white'}} href='#'>Home</a>
              </li>
              <li>
                <a style={{color: 'white'}} href='#'>About Us</a>
              </li>
              <li>
                <a style={{color: '#bbbbbb'}} href='#'>How it Works</a>
              </li>
              <li>
                <a style={{color: 'white'}} href='#'>Careers</a>
              </li>
              <li>
                <a style={{color: 'white'}} href='#'>Blogs</a>
              </li>
              <li>
                <a style={{color: 'white'}} href='#'>Our Team</a>
              </li>
              <li>
                <a style={{color: 'white'}} href='#'>Contact us</a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-3 ">
            <h3>Help</h3>
            <ul
              style={{ "list-style-type": "none", "padding-inline-start": 0 }}
            >
              <li>Why Invest</li>
              <li>Investor FAQs</li>
              <li>Quick links</li>
              <li>Glossary</li>
            </ul>
          </div>
        </div>
        <div
          style={{ fontSize: 20, color: "#bbbbbb" }}
          className="row justify-content-center"
        >
          <div className=" offset-2 col-4">Corporate Address: </div>
          <div className="col-auto">
            Send you queries here Email: info@invybiz.com and Phone No. +91 0000
            000 000
          </div>
          <div className="col-auto">
            Copyright © NameHere Pvt Ltd 2020. All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
