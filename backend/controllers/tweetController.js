import { tweetModel } from "../models/twettModel.js"
import { userModel } from '../models/userModel.js'
import { uploadCloudinary } from "../services/cloudinary.js"



export const createTweet = async (req,res) =>{
    try{
        const {description , userID} = req.body
        let mediaUrl = req.file

        if (!description ){
            return res.status(401).json({
                message:"Fields Are Required",
                success:false
            })
        }

        if(req.file) {

            const cloudinaryResponse =  await uploadCloudinary(req.file.path)
            mediaUrl = cloudinaryResponse.secure_url

        }

        const Tweet = await tweetModel.create({
            description,
            userID,
            mediaUrl:mediaUrl

        })

        await userModel.findByIdAndUpdate(
            userID,
            { $push: { tweets: Tweet._id } }, // Push new tweet ID to user
            { new: true } // Return updated user document
          );


        return res.status(201).json({
            message:"Tweet Created successfully",
            success:true
        })





    }catch(err){
 

    }
}


export const deleteTweet = async (req,res) =>{


    try{
         
   const tweet = await tweetModel.findOneAndDelete({_id:req.params.id})



  return res.status(200).json({
            message:"Tweet Deleted Succesfully",
            success:true,

        })
            
        

    }
    catch(err){

        console.log(err)


    }
}



//like route 




export const likeTweet = async (req,res)=>{
    try{
        const loggedUserId = req.body.id
        const tweetId = req.params.id

        const Tweet = await tweetModel.findOne({_id:tweetId})

        if(Tweet.likes.includes(loggedUserId)){
            //dislike
            await tweetModel.findByIdAndUpdate(tweetId ,{$pull:{likes:loggedUserId}})
            //pullng (removing) user id in like array of tweet
            return res.status(200).json({
                message:"You Disliked Tweet" ,
                success:true,
                Action:true
            })
        }
        else{
            await tweetModel.findByIdAndUpdate(tweetId ,{$push:{likes:loggedUserId}})
            //adding or pushing user id in like array of tweet
            return res.status(200).json({
                message: "You Liked Tweet",
                success:true,
                Action:false

            })
        }
    }catch(err){
        console.log(err)
    }
}



export const getAllTweet = async (req,res)=>{
    try{

        const tweets =await tweetModel.find().populate("userID")

        return res.status(200).json({
            tweets
        })

        


    }catch(err){

        console.log(err)



    }
}





export const userFollowingTweets = async (req,res)=>{
    try{

        const id = req.params.id

        if(!id){
            return res.status(401).json({
                message:"User Must Given"
            })
        }

        const loggedInUser = await userModel.findById(id)

        if(!loggedInUser){
            return res.status(401).json({
                message:"User Not Found"
            })
        }


        const GetTweets = await Promise.all(loggedInUser.following.map(async(userId)=>{
            return (
                tweetModel.find({userID:userId}).populate("userID")
            )
        }))

        res.status(201).json({
            GetTweets
    })

    }catch(err){
        console.log(err)
    }
}
