const express = require("express");
const app = express();

//Middleware.
app.use(express.json({ extended: false }));

//Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
