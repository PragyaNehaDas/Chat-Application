const express = require("express")
const dotenv = require("dotenv")
const cookieParser =  require("cookie-parser")
dotenv.config();

const connectDB = require("./db");
const authRoutes = require("./routes/auth.routes.js");
const messageRoutes = require("./routes/message.routes.js")
const userRoutes = require("./routes/user.routes.js");
const { server, app } = require("./socket/socket.js");

// const app = express()

const port = process.env.PORT || 5000;
connectDB();

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)



server.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
    
})

//error handler

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})