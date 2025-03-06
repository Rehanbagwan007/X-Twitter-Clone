
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config({
    path:"../config/.env"
})


export const authentication = async (req,res,next)=>{
    try{

        const token = req.cookies.token
    

        if(!token){
            return  res.status(401).json({
                message:"User Not Authorized",
                success:false
            })
        }

        const decode = await jwt.verify(token ,process.env.JWT_KEY)
       
        req.user = decode
        next()

    }catch(err){

        console.log(err)
    }
}


