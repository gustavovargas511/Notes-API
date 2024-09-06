const express = require("express");
const router = express.Router();
const mysqlConn = require("mysql2");
require("dotenv").config();

//** Connection */

const connection = mysqlConn.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

connection.connect((err) => {
  if (err) {
    console.log("Error connectiong to notes db", err);
    return;
  }

  console.log("Connection to notes api successful");
});
/************** */

/** Get ALL Notes */
router.get("/", (req, res) => {
  const query = "SELECT * FROM notes";

  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).send({ error: "Database query failed" });
      return;
    }

    res.send({ success: true, data: result });
  });
});

/** Get a single note by ID */
router.get("/:id", (req, res) => {
  const noteID = req.params.id;
  const query = "SELECT * FROM notes WHERE id = ?";
  // console.log(noteID, query);
  connection.query(query, [noteID], (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).send({ error: "Database query failed" });
      return;
    }

    // Ensure the result is not empty and contains only one row
    if (result.length === 0) {
      res.status(404).send({ success: false, error: "Note not found" });
      return;
    }

    res.send({ success: true, data: result[0] });
  });
});

// Add a new note
router.post("/", (req, res) => {
  const { text, tag, username } = req.body;
  const date = new Date().toISOString().slice(0, 10);

  const query = "INSERT INTO notes (txt, tag, username, date) VALUES (?,?,?,?)";
  const values = [text, tag, username, date];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).send({ error: "Database query failed" });
      return;
    }

    const newNote = {
      id: result.insertId,
      text: result.text,
      tag: result.tag,
      username: username,
      date: date,
    };

    res.send({ success: true, data: newNote });
  });
});

// Delete a note
router.delete("/:id", (req, res) => {
  const noteID = req.params.id;
  const query = "DELETE FROM notes WHERE id = ?";

  connection.query(query, [noteID], (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).send({ error: "Database query failed" });
      return;
    }

    res.send({ success: true });
  });
});

// Update a note

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { text, tag, username } = req.body;

  // Validate at least one param is provided
  if (!text && !tag && !username) {
    return res
      .status(404)
      .json({ error: "At least one field is required for update" });
  }

  let query = "UPDATE notes SET";
  const updates = [];
  const values = [];

  if (text) {
    updates.push("txt = ?");
    values.push(text);
  }
  if (tag) {
    updates.push("tag = ?");
    values.push(tag);
  }
  if (username) {
    updates.push("username = ?");
    values.push(username);
  }

  query += ` ${updates.join(", ")} WHERE id = ?`;
  values.push(id); // Add the ID as the last parameter for the WHERE clause

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query: ", err);
      return res
        .status(500)
        .send({ success: false, error: "Database query failed" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ success: false, error: "Note not found" });
    }

    res.send({ success: true, message: "Note updated successfully" });
  });
});

module.exports = router;
