import express from 'express';
import { checkAuth, login, signup, updateprofile } from '../controllers/UserController';
import { protectroute } from '../middleware/auth';


const userrouter = express.Router();

userrouter.post("/signup", signup);
userrouter.post("/login", login);
userrouter.post("/update-profile", protectroute, updateprofile);
userrouter.post("/check", protectroute, checkAuth);

export default userrouter;

