import mongoose from "mongoose";

//connecting to the db

export const connectdb = async () =>{
    try {
        mongoose.connection.on('connected', ()=> console.log('database connected'));
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.log(error)
    }
}