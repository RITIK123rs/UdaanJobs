
const mongoose= require("mongoose");

const connectDB = async() => {
    try{
        await  mongoose.connect(process.env.mongo_url);
        console.log(process.env.mongo_url);
        console.log("Mongodb Connected Successfully");
    }
    catch(error){
        console.error("Mongodb Error : ",error);
        process.exit(1) // fail exit (if we use 0 that means successfully exit)
    }

}

module.exports=connectDB;