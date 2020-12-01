const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator"); //from Express validator
const bcrypt = require("bcryptjs"); //For Hashing the password.
const jwt = require("jsonwebtoken");
const config = require("config");
//const auth = require("../middleware/auth"); // this is brought to the route which need projection

const User = require("../models/User");

// @route GET api/auth
// @desc Get the logged in user
// @access Private

router.get("/", (req, res) => {
  res.send("auth");
});

// @route POST api/auth
// @desc Auth user & get token
// @access Public

router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    //Express-validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //sends the array of errors with the errors object.
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      //comparing the hashed password with Bcrypt
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({ msg: "Invalid Credentials" });
      }

      //jwt for the user who tries to login
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
