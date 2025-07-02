import express from "express";
import { getmessage, getusersforsidebar, markmessageassen, sendmessage } from "../controllers/messageController";
import { protectroute } from "../middleware/auth";

const messagerouter = express.Router();

messagerouter.get('/users', protectroute, getusersforsidebar);
messagerouter.get('/:id', protectroute, getmessage);
messagerouter.put('mark/:id', protectroute, markmessageassen);
messagerouter.post('/send/:id', protectroute, sendmessage);

export default messagerouter;
