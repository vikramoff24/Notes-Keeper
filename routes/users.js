const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator"); //from Express validator
const bcrypt = require("bcryptjs"); //For Hashing the password.
const jwt = require("jsonwebtoken");
const config = require("config");
//Model
const User = require("../models/User");

// @route POST api/users
// @desc Register a user
// @access Public
router.post(
  "/",
  [
    //Express-validation
    //for checking the input with particular condition. Validating the entry
    check("name", "Please add a name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    //code for returning error is any
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      //sends the array of errors with the errors object.
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email }); //email is actually email:email

      if (user) {
        return res.status(400).json({ msg: "User already exists" }); //400 is bad request
      }
      //creating new instance of the user
      user = new User({
        name, //name:name
        email,
        password,
      });

      //hashing the password using bcrypt -- all this lines return promises so we use await
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      //For sending (data) in the token
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 36000, //options
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
