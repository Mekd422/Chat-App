import express from 'express'
import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import { connectdb } from './lib/db.js';
import userrouter from './routes/userRoutes.js';
import messagerouter from './routes/MessageRoutes.js';


//create express app and http server
const app = express();
const server = http.createServer(app);

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


