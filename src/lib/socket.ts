// socket.js
import io from "socket.io-client";
const Base_url = import.meta.env.VITE_BASE_URL_WS;
const socket = io(Base_url);

export default socket;
