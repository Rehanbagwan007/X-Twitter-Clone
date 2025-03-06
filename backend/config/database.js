import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config({
    path:".env"
})



const connectDB = async ()=>{
   await mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log(`Connected To Database`)
    }).catch(err=>{
        
        if(err){

           mongoose.connect('mongodb://localhost:27017/Twitter-Clone').then(()=>{
                console.log("connected to local database");
                
            }).catch((err)=>{
              console.log(`connection false to local ${err}`);
              
            })
        }
        
        console.log(`Unabale connect due to ${err}`)
    })
}




export default connectDB