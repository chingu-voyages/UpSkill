module.exports = (io) => {
  let connectedUser = [];
  io.on("connection", (socket) => {
    //when user are connect to the message page
    socket.on("setConnectedUser", (data) => {
      const user = connectedUser.some((value) => value.userId === data.userId);
      const socketId = socket?.id;
      user
        ? connectedUser.map((value) => {
            return value.userId === data.userId ? { ...data, socketId } : value;
          })
        : connectedUser.push({ ...data, socketId });
    });

    //when user send a private message
    socket.on("sendMessage", (data) => {
      const user = connectedUser.find((value) => value.userId === data.recever);
      io.to(user?.socketId).emit("getMessage", {
        correspondance: data.sender,
        message: data.message,
      });
    });

    //when the user disconnect or when the page message is unmounted
    socket.on("disconnect", () => {
      connectedUser = connectedUser.filter(
        (value) => value.socketId !== socket.id
      );
    });
  });
};
