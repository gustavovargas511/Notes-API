const express = require("express");
const port = 5000;

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
  

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Notes App");
});

app.get("/allNotes", (req, res) => {
    res.send(notes);
  });

app.listen(port, () => console.log(`Server listening on port: ${port}`));
