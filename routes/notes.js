//CRUD Route.
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); //Whenever we need to protect routes we need to use this middleware
//Model
const Note = require("../models/Note");

// @route    GET api/notes
// @desc     Get all users notes
// @access   Private

//adding the parameter Auth makes the routes protected.
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({
      date: -1,
    }); //makes most recentnotes first
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route   POST api/notes
// @desc    Add new note
// @access  Private

router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;

  try {
    const newNote = new Note({
      title,
      description,
      user: req.user.id, //This gives reference to the user who have logged in
    });
    const note = await newNote.save();
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route     PUT api/notes/:id
// @desc      Update note
// @access    Private
router.put("/:id", auth, async (req, res) => {
  const { title, description } = req.body;

  // Build note object
  const noteFields = {};
  if (title) noteFields.title = title;
  if (description) noteFields.description = description;

  try {
    let note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ msg: "Note not found" });

    // Make sure user owns note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: noteFields },
      { new: true }
    );

    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/notes/:id
// @desc      Delete note
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ msg: "Note not found" });

    // Make sure user owns note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Note.findByIdAndRemove(req.params.id);

    res.json({ msg: "Note removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
