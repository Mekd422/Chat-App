import express from "express";
import { getmessage, getusersforsidebar, markmessageasseen, sendmessage } from "../controllers/messageController.js";
import { protectroute } from "../middleware/auth.js";

const messagerouter = express.Router();

messagerouter.get('/users', protectroute, getusersforsidebar);
messagerouter.get('/:id', protectroute, getmessage);
messagerouter.put('/mark/:id', protectroute, markmessageasseen);
messagerouter.post('/send/:id', protectroute, sendmessage);

export default messagerouter;
