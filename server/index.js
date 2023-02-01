const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const PORT = process.env.PORT || 3000;
const httpServer = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTURL,
  },
});

/**
 * Socket IO
 */
require("./sockets/socket-events")(io);

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
app.use("/messages", require("./routes/messages"));

httpServer.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});
