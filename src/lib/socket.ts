// socket.js
import io from "socket.io-client";

// const socket = io("http://localhost:3000");
const socket = io(
  "http://ec2-3-109-78-168.ap-south-1.compute.amazonaws.com:3000"
);

export default socket;
