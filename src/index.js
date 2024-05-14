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
        socket.on('sendMessage', ({ receiverId }) => {
          console.log("Message Send By user");
          
          io.emit('newMessage', receiverId);
        });
      
    socket.on("disconnect", () => {
        console.log("User disconnected:");
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
