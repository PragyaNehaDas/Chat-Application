// const {Server} = require("socket.io")
// const http = require("http")
// const express = require("express")

// const app = express()

// const server = http.createServer(app)

// const io = new Server(server,{
//     cors: {
//         origin: [`http://localhost:5173`],
//         methods: ["GET", "POST"],
//     },
// })

// // const getReceiverSocketId = (receiverId) =>{
// //     return userSocketMap[receiverId]
// // }

// const userSocketMap = {}

// const getReceiverSocketId = (receiverId) =>{
//     return userSocketMap[receiverId]
// }

// io.on("connection", (socket) =>{
//     console.log("A user connected", socket.id);

//     const userId = socket.handshake.query.userId

//     if(userId !== undefined){
//         userSocketMap[userId] = socket.id
//     }

//     //io.emit is used to send events to all the connected clients/users 
//     io.emit("getOnlineUsers", Object.keys(userSocketMap))

//     socket.on("disconnect", ()=>{
//         console.log("User disconnected", socket.id);
//         delete userSocketMap[userId]
//         io.emit("getOnlineUsers", Object.keys(userSocketMap))
        
//     })
    
// })

// module.exports = {app, server, io, getReceiverSocketId}

const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {};

// Function to get the socket ID of a receiver
const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    // Retrieve userId from query parameters
    const userId = socket.handshake.query.userId;

    if (userId) {
        userSocketMap[userId] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        // Remove user from map
        for (const [key, value] of Object.entries(userSocketMap)) {
            if (value === socket.id) {
                delete userSocketMap[key];
                break;
            }
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

module.exports = { app, server, io, getReceiverSocketId };
