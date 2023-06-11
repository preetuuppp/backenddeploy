const express = require("express");
const noteRouter = express.Router();
const { noteModel } = require("../model/noteModel");
const { auth } = require("../middleware/auth");

noteRouter.use(auth);
noteRouter.post("/create", async (req, res) => {
  try {
    const note = new noteModel(req.body);
    await note.save();
    res.json({ msg: "New note created", note: req.body });
  } catch (error) {
    res.json({ msg: "Could not create" });
  }
});

//Getting notes
noteRouter.get("/", async (req, res) => {
  try {
    const note = await noteModel.find({ userID: req.body.userID });

    res.json(note);
  } catch (error) {
    res.json({ msg: "Could not found" });
  }
});

// updating a note

noteRouter.patch("/update/:noteID", async (req, res) => {
  const userIDinUserDoc = req.body.userID;
  const { noteID } = req.params;
  try {
    const note = await noteModel.findOne({ _id: noteID });
    console.log(note);
    const userIDinNoteDoc = note.userID;
    if (userIDinUserDoc === userIDinNoteDoc) {
      // console.log(
      //   "userId in USERdoc",
      //   userIDinUserDoc,
      //   "userId in note",
      //   userIDinNoteDoc
      // );
      await noteModel.findByIdAndUpdate({ _id: noteID }, req.body);
      res.json({ msg: `${note.title} has been updated` });
    } else {
      // console.log(
      //   "userId in USERdoc",
      //   userIDinUserDoc,
      //   "userId in note",
      //   userIDinNoteDoc
      // );
      res.json({ msg: "Not Authorized" });
    }
  } catch (error) {
    res.json({ msg: "Could not find" });
  }
});

// deleted a note
noteRouter.delete("/delete/:noteID", async (req, res) => {
  const userIDinUserDoc = req.body.userID;
  const { noteID } = req.params;
  try {
    const note = await noteModel.findOne({ _id: noteID });
    console.log(note);
    const userIDinNoteDoc = note.userID;
    if (userIDinUserDoc === userIDinNoteDoc) {
      // console.log(
      //   "userId in USERdoc",
      //   userIDinUserDoc,
      //   "userId in note",
      //   userIDinNoteDoc
      // );
      await noteModel.findByIdAndDelete({ _id: noteID });
      res.json({ msg: `${note.title} has been deleted` });
    } else {
      // console.log(
      //   "userId in USERdoc",
      //   userIDinUserDoc,
      //   "userId in note",
      //   userIDinNoteDoc
      // );
      res.json({ msg: "Not Authorized" });
    }
  } catch (error) {
    res.json({ msg: "Could not find" });
  }
});

module.exports = {
  noteRouter,
};
