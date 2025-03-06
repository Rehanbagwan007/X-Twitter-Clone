import { userModel } from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({
    path:".env"
})
export const Register = async (req,res)=>{
    try{
        const {name , username ,email , password} = req.body
         
        // Checking All Fields 

        if(!name || !username || !email  || !password){

            return res.status(401).json({
                message:"All fields are required",
                success:false
            })

        }
   
        // Checking User Is Already Exist Or Not
        const user = await userModel.findOne({email:email})

        if(user){
            return res.status(401).json({
                message:"User Already Exist",
                success:false
            })
        }

        // Creating User if This User is Not Created

                // hashing pasword

                const hashedPassword = await bcrypt.hash(password ,10)
                
              const createdUser =  await userModel.create({
                   name,
                   username,
                   email,
                   password:hashedPassword

              })
              
 //genreating token 
              const tokenData = {
                userId:createdUser._id,
              };
          
              const token = await jwt.sign(tokenData, process.env.JWT_KEY);
          
              // Sending response
        
              return res
                .status(201)
                .cookie("token", token, { expireIn: "1d", httpOnly: true })
                .json({
                  message: `User Is Registred`,
                  createdUser,
                  success: true,
                });

          

             

    }catch(err){

        console.log(`Process Is Stucked ${err}`)


    }
}


//Login Contorller
export const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Checking fields
      if (!email || !password) {
        return res.status(401).json({
          message: "All fields are required",
          success: false,
        });
      }

      // Checking user existence
      const user = await userModel.findOne({email:email});
  
      // Returning failure if user does not exist
      if (!user) {
        return res.status(401).json({
          message: "User does not exist",
          success: false,
        });
      }
  
      // Comparing password if user is found
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({
          message: "Incorrect password",
          success: false,
        });
      }
  
      // Making token
      const tokenData = {
        userId: user._id,
      };
  
      const token = await jwt.sign(tokenData, process.env.JWT_KEY);
  
      // Sending response
      return res
        .status(201)
        .cookie("token", token, { expireIn: "1d", httpOnly: true })
        .json({
          message: `Welcome Back ${user.username}`,
          user,
          success: true,
        });
    } catch (err) {
      console.log(`Process is stuck because ${err}`);
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  };
  


  export const Logout = async (req,res)=>{

    return res.cookie("token" , "" , {expireIn:new Date(Date.now)}).json({
        message:"user logout succesfully",
        success:true
    })

  }




  
//bookmark 
export const bookmarkTweet = async (req, res) => {
  try {
    const loggedUserId = req.body.id;
    const tweetId = req.params.id;

    // Validate loggedUserId
    if (!loggedUserId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }
    // Find user
    const user = await userModel.findById(loggedUserId);

    // Validate user existence
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if tweet is already bookmarked
    if (user.bookmarks.includes(tweetId)) {
      // Remove from bookmarks
      await userModel.findByIdAndUpdate(loggedUserId, { $pull: { bookmarks: tweetId } });
      return res.status(200).json({
        message: "Removed from bookmarks",
        success:true
      });
    } else {
      // Add to bookmarks
      await userModel.findByIdAndUpdate(loggedUserId, { $push: { bookmarks: tweetId } });
      return res.status(200).json({
        message: "Added to bookmarks",
        success:true
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
      success:false
    });
  }
};


//get profile roue
export const getProfile = async (req,res)=>{
  try{

    const id = req.params.id

    const user = await userModel.findById(id).select("-password")

    return res.status(200).json({
      user
    })

  }catch(err){
    console.log(`Process is stucked becaouse ${err}`)
  }
}

///get other users without user who logged in 


export const getOtherUsers = async (req,res)=>{
  try{

    const {id} =  req.params
  
    const otherUser = await userModel.find({_id:{$ne:id}}).select("-password")

    if(!otherUser){
      return res.status(401).json({
        message:"currently do not have user in databse"
      })


    }
      return res.status(200).json({
        otherUser
      })




      
  }catch(err){

    console.log(err)

  }
}


///follow user contoler its works like if you follow xyz user your id will add to xyz user followers array and in your following array xyz user id will add
export const follow = async(req,res)=>{
  try {
      const loggedInUserId = req.body.id; 
      const userId = req.params.id; 
      const loggedInUser = await userModel.findById(loggedInUserId);//patel
      const user = await userModel.findById(userId);//keshav
      if(!user.followers.includes(loggedInUserId)){
          await user.updateOne({$push:{followers:loggedInUserId}});
          await loggedInUser.updateOne({$push:{following:userId}});
      }else{
          return res.status(400).json({
              message:`User already followed to ${user.name}`
          })
      };
      return res.status(200).json({
          message:`${loggedInUser.name} just follow to ${user.name}`,
          success:true
      })
  } catch (error) {
      console.log(error);
  }
}



export const unfollow = async (req,res) => {
  try {
      const loggedInUserId = req.body.id; 
      const userId = req.params.id; 
      const loggedInUser = await userModel.findById(loggedInUserId);//patel
      const user = await userModel.findById(userId);//keshav
      if(loggedInUser.following.includes(userId)){
          await user.updateOne({$pull:{followers:loggedInUserId}});
          await loggedInUser.updateOne({$pull:{following:userId}});
      }else{
          return res.status(400).json({
              message:`User has not followed yet`
          })
      };
      return res.status(200).json({
          message:`${loggedInUser.name} unfollow to ${user.name}`,
          success:true
      })
  } catch (error) {
      console.log(error);
  }
}
