import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
                                                                                                                                                                
app.use(cors({
    origin: "*"
}));



io.on("connection", (socket) => {   
        // socket.send("Message from User");
        socket.on('sendMessage', ({ receiverId, senderId }) => {
          console.log({receiverId, senderId});
          io.emit('newMessage', {receiverId,  senderId});
        });
      
    socket.on("disconnect", () => {
        console.log("User disconnected:");
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
