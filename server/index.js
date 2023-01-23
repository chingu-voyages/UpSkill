const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const PORT = process.env.PORT || 3000;

//middleware to control CORS
app.use(cors());
//middleware to access body data
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Routes
app.use("/user", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
app.use("/tokens", require("./routes/tokens"));
app.use("/lessons", require("./routes/lessons"));
app.use("/messages", require("./routes/messages.routes"));

app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});
