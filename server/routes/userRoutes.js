import express from 'express';
import { checkAuth, login, signup, updateprofile, logout } from '../controllers/userController.js';
import { protectroute } from '../middleware/auth.js';




const userrouter = express.Router();

userrouter.post("/signup", signup);
userrouter.post("/login", login);
userrouter.put("/update-profile", protectroute, updateprofile);
userrouter.get("/check", protectroute, checkAuth);
userrouter.post("/logout", protectroute, logout);

export default userrouter;

