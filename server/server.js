import express from 'express'
import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import { connectdb } from './lib/db.js';


//create express app and http server
const app = express();
const server = http.createServer(app);

//middleware setup
app.use(express.json({limit:"4mb"}));
app.use(cors());

app.use("/api/status", (req, res)=> res.send("server is live"));

//connect to mongodb
await connectdb();

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=> console.log('server is running on port' + PORT));


