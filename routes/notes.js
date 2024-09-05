const express = require("express");
const router = express.Router();

const notes = [
  {
    id: 1,
    text: "A note about something I can't forget",
    tag: "technology",
    username: "Gustavo Vargas",
    date: "2024-09-04",
  },
  {
    id: 2,
    text: "Reminder to buy groceries",
    tag: "personal",
    username: "John Doe",
    date: "2024-08-29",
  },
  {
    id: 3,
    text: "Finish the Vue.js project",
    tag: "work",
    username: "Jane Smith",
    date: "2024-08-30",
  },
  {
    id: 4,
    text: "Check the new JavaScript ES features",
    tag: "programming",
    username: "Gustavo Vargas",
    date: "2024-09-01",
  },
  {
    id: 5,
    text: "Plan weekend trip",
    tag: "personal",
    username: "Mike Johnson",
    date: "2024-08-28",
  },
  {
    id: 6,
    text: "Read up on AI advancements",
    tag: "technology",
    username: "Sarah Lee",
    date: "2024-09-03",
  },
];

/** Get ALL Notes */
router.get("/", (req, res) => {
  res.send({
    success: true,
    data: notes,
  });
});

/** get note by ID */

router.get("/:id", (req, res) => {
  const note = notes.find((idea) => idea.id === +req.params.id);

  if (!note) {
    return res.status(404).json({
      success: false,
      error: "Resource not found",
    });
  }

  res.json({
    success: true,
    data: note,
  });
});

// add a new note

router.post("/", (req, res) => {
  const note = {
    id: notes.length + 1,
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
    date: new Date().toISOString().slice(0,10),
  };

  notes.push(note);
  console.log(note)
  res.send({ success: true, data: note });

});

// update a note

router.put("/:id", (req, res) => {
  const note = notes.find((idea) => idea.id === +req.params.id);

  if (!note) {
    return res.status(404).json({
      success: false,
      error: "Resource not found",
    });
  }

  note.text = req.body.text || note.text;
  note.tag = req.body.tag || note.tag;

  res.send({ success: true, data: note})
})

// delete a note

router.delete("/:id", (req, res) =>{
  const note = notes.find(note => note.id === +req.params.id)

  if (!note) {
    return res.status(404).json({
      success: false,
      error: "Resource not found",
    });
  }

  notes.splice(notes.indexOf(note), 1)
  res.send({success:true});
})

module.exports = router;
