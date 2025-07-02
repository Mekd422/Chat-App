import { generateToken } from "../lib/utils";
import User from "../models/User";

// sign up new user
export const signup = async (req, res) => {

    const {fullName, email, password, bio} = req.body;

    try {
        if (!fullName || !email || !password || !bio){
            return res.json({success:false, message: "missing details"})
        }

        const user = await User.findOne({email});

        if(user){
            return res.json({success:false, message: "account already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName, email, password: hashedpassword, bio
        });

        const token = generateToken(newUser._id)
        res.json({success:true, userData: newUser, token, message:"account created successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message});
    }
    
}

// controller to login a user

export const login = async (req, res) => {

    
    try {
        const {email, password} = req.body;
        const userData = await User.findOne({email});
        const ispasswordcorrect = await bcrypt.compare(password, userData.password);

        if(!ispasswordcorrect){
            return res.json({success:false, message: "invalid credentials"});
        }

        const token = generateToken(userData._id)
        res.json({success:true, userData, token, message:"login successfull"})


        
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message});
        
    }
    
}