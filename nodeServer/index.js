// Node server for socket.io
const io = require("socket.io")(8000, {
  cors: {
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log("connection established: ", socket.id);
  socket.on("new-user-joined", (name) => {
    console.log("New user joined...", name);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("recieve", {
      message: message,
      name: users[socket.id],
    });
  });
});
