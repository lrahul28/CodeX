const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const gravatar = require("gravatar");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");
const passport = require("passport");

//@route POST api/users

router.post("/login", (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
  
    User.findOne({ email }).then(user => {
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
      console.log(user);
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.firstname,
            email: user.email,
            userType: user.userType
          };
  
          jwt.sign(payload,
            config.get('secretOrKey'),
            {
              expiresIn: 31556926 
            },(err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });
  
router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email,{
        s: '200',
        r: 'pg',
        d: 'mm'
      })
        const newUser = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
          avatar: avatar,
          userType: req.body.userType
        });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();

        const payload = {
          newUser: {
            id: newUser.id
          }
        };
        jwt.sign(
          payload, 
          config.get('secretOrKey'),
          {expiresIn: 360000},
          (err, token) => {
            if(err) throw err;
            res.json({token});
          })
        res.send('Successfully registered');
      }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports= router;