import { io } from "socket.io-client";

// const URL = "localhost:3000";
const URL = "https://chiladetto-backend.onrender.com";

export const socket = io(URL);
