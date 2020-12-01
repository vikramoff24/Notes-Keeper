//CRUD Route.
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); //Whenever we need to protect routes we need to use this middleware
const { check, validationResult } = require("express-validator");
//Model
const User = require("../models/User");
const Note = require("../models/Note");

// @route    GET api/contacts
// @desc     Get all users notes
// @access   Private

//adding the parameter Auth makes the routes protected.
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({
      date: -1,
    }); //makes most recent contacts first
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route   POST api/contacts
// @desc    Add new note
// @access  Private

router.post(
  "/",
  [auth, [check("title", "title is Required").not().isEmpty()]],
  async (req, res) => {
    //Express-validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //sends the array of errors with the errors object.
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;

    try {
      const newNote = new Note({
        title,
        description,
        user: req.user.id, //This gives reference to the user who have logged in
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route     PUT api/contacts/:id
// @desc      Update contact
// @access    Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
