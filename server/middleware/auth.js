import User from "../models/User.js";

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



