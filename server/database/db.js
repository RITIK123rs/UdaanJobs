
const mongoose= require("mongoose");

if (!process.env.mongo_url) throw new Error("MONGO_URI is not defined in environment variables");

const connectDB = async() => {
    try{
        await  mongoose.connect(process.env.mongo_url);
        // console.log(process.env.mongo_url);
        // console.log("Mongodb Connected Successfully");
    }
    catch(error){
        console.error("Mongodb Error : ",error);
        process.exit(1);
    }

}

module.exports=connectDB;