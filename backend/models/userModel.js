import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true            
    },
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    password:{
        type:String,
        required:true,    
    },
    tweets:[
        {
              type:mongoose.Schema.Types.ObjectId,
                ref:"Tweet"
         }
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    bookmarks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Tweet"
          
        }
       ]

},{timestamps:true})




export const userModel = mongoose.model("User" , userSchema)

