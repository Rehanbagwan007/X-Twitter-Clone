import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
          
        }
       ],
       mediaUrl: { type: String }, 
       
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"      
    },

},{timestamps:true})



export const tweetModel = mongoose.model("Tweet" , tweetSchema)

