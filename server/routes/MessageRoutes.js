import express from "express";
import { getmessage, getusersforsidebar, markmessageassen } from "../controllers/messageController";
import { protectroute } from "../middleware/auth";

const messagerouter = express.Router();

messagerouter.get('/users', protectroute, getusersforsidebar);
messagerouter.get('/:id', protectroute, getmessage);
messagerouter.get('mark/:id', protectroute, markmessageassen);

export default messagerouter;
