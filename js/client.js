const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
};

const name = prompt("Enter you name to join");
socket.emit("new-user-joined", name);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

socket.on("recieve", (data) => {
  append(`${data.name}: ${data.message}`, "left");
});

socket.on("user-joined", (name) => {
  append(`${name} just joined`, "left");
});

socket.on("user-left", (name) => {
  append(`${name} has left the chat.`, "left");
});