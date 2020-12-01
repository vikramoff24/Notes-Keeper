const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// @route POST api/users
// @desc Register a user
// @access Public

router.post("/",[check("name","Please add a name").not().isEmpty(),

check("email","Please include a valid email").isEmail(),
check("password","please enter a password with 6 or more characters").isLength({min :6})],

async (req,res)=>
{
const errors=validationResult(req);

if(!error.isEmpty()){
return res.status(400).json({errors:errors.array()});
}
const {name,email,passsword}=req.body;
try {
  let user = await User.findOne({ email }); //email is actually email:email

  if (user) {
    return res.status(400).json({ msg: "User already exists" }); //400 is bad request
  }

});

router.get("/", (req, res) => {
  res.send("users");
});
module.exports = router;
