const express = require("express");
const port = 5000;

/** Routers */
const notesRouter = require("./routes/notes");
/********** */

const app = express();

/**Body parser middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false}))

/**Main page */
app.get("/", (req, res) => {
  res.send({
    success: true,
    data: {
      message: "Welcome to the notes API",
    },
  });
});

/** notes routes */
app.use("/api/notes", notesRouter);
/*************** */

app.listen(port, () => console.log(`Server listening on port: ${port}`));
