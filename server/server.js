import express from 'express'
import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import { connectdb } from './lib/db.js';
import userrouter from './routes/userRoutes.js';
import messagerouter from './routes/MessageRoutes.js';
import {server} from "socket.io"


//create express app and http server
const app = express();
const server = http.createServer(app);

// initialize socket.io server

export const io = new server(server,{
    cors: {origin: "*"}
})

// store online users
export const usersocketmap = {};// {userid: socketid}


// socket.io connection handler

io.on("connection", (socket)=>{
    const userId = socket.handshake.query.userId;
    console.log("user connected", userId);

    if(userId) usersocketmap[userId] = socket.idl

    // emit online users to all connected clients
    io.emit("getonlineusers", Objects.keys(usersocketmap));
    socket.on("disconnect", ()=>{
        console.log("user disconnected", userId);
        delete usersocketmap[userId];
        io.emit("getonlineusers", Object.keys(usersocketmap));
    })

})
//middleware setup
app.use(express.json({limit:"4mb"}));
app.use(cors());


// routes setup
app.use("/api/status", (req, res)=> res.send("server is live"));
app.use("/api/auth", userrouter);
app.use('/api/messages', messagerouter);

//connect to mongodb
await connectdb();

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=> console.log('server is running on port' + PORT));


