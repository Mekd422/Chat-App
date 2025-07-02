import Message from '../models/Message.js'
import User from '../models/User.js'
import cloudinary from '../lib/cloudinary.js'
import { io, usersocketmap} from '../server.js';

// get all users except the logged in user

export const getusersforsidebar = async (req, res) => {
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: userId}}).select("-password");

        // count number of messages not seen

        const unseenmessages = {}
        const promises = filteredUsers.map(async (user) => {
            const messages = await Message.find({senderId: user._id, receiverId: userId, seen: false})
            if(messages.length > 0){
                unseenmessages[user._id] = messages.length;
            }

        })
        await Promise.all(promises);
        res.json({success:true, users: filteredUsers, unseenmessages});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}


// get all messages for selected user

export const getmessage = async (req, res) => {
    try {
        const {id: selectedUserId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: selectedUserId},
                {senderId: selectedUserId, receiverId: myId}
            ]
        })
        await Message.updateMany({senderId: selectedUserId, receiverId: myId}, {seen: true});

        res.json({success: true, messages})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

// api to mark message as seen using message id

export const markmessageassen = async (req, res) => {
    try {
        const {id} = req.params;
        await Message.findByIdAndUpdate(id, {seen:true});
        res.json({success: true});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }   
}


//send message to selected user

export const sendmessage = async (req, res) => {
    try {
        const {text, image} = req.body;
        const recieverid = req.params.id;
        const senderid = req.user._id;

        let imageurl;
        if(image){
            const uploadresponse = await cloudinary.uploader.upload(image);
            imageurl = uploadresponse.secure_url;
        }

        const newmessage = await message.create({
            senderid,
            recieverid,
            image: imageurl,
            text
        })

        // emit the new message to the reciever's socket

        const receiversocketid = usersocketmap[recieverid];
        if (receiversocketid){
            io.to(receiversocketid).emit("new message", newmessage);
        } 
        res.json({success:true, newmessage});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}