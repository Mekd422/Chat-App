import User from "../models/User";

export const protectroute = async (req, res, next) => {
    try {
        const token = req.header.token;
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decode.userId).select("-password");

        if(!user) return res.json({success:false, message: "user not found"});
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message});
    }

}

// contoller to check if user is authenticated 
export const checkAuth = (req,  res)=>{
    res.json({success:true, user: req.user});
}

// controller to update user profile details

export const updateprofile = async (req, res) => {
    try {
        const {profilepic, bio, fullname} = req.body;
        const userId = req.user._id;
        let updateduser;

        if(!profilepic){
            updateduser = await User.findByIdAndUpdate(userId, {bio, fullname}, {new:true});

        }else{
            const upload = await cloudinary.uploader.upload(profilepic);

            updateduser = await User.findByIdAndUpdate(userId, {profilePic: upload.secure_url, bio, fullname}, {new:true});

        }
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
    
}
