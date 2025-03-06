import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


import  dotenv  from "dotenv";


dotenv.config({
   path:".env"
})

// Configuration
cloudinary.config({ 
    cloud_name: 'ddpkr1nhe', 
    api_key:process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET  // Click 'View API Keys' above to copy your API secret
});




export const uploadCloudinary = async (localFilePath)=>{
    try {
          
        if(!localFilePath) return null

        const res = await cloudinary.uploader.upload(localFilePath , {
            resource_type: "auto"
        })

        console.log("file is upload on cloudinary " , res.url);
        

         return res

        
    } catch (error) {
         fs.unlinkSync(localFilePath)
     
        console.log(error);
        
    }
}