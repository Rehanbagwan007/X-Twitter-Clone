import generatePost from "../services/ai.prompt.js";
import generateContent from "../services/ai.service.js"


export const factChecker = async (req,res)=>{

  try{

    const claim = req.body.claim
    
    


    const response = await generateContent(claim)


    return res.status(200).json({
        message: "Tweet Is Checked",
        response,
        success:true
      });


  }catch(err){
    console.log(err);
    
  }

   

}


export const aiWritePost = async (req,res)=>{


  try{
    const prompt = req.body.prompt


    const genertedPost =  await generatePost(prompt)
  
  
    return res.status(200).json({
      message: "Tweet Is Created",
      genertedPost,
      success:true
    });
  
  


  }catch(err){
    console.log(err);
    
  }

  

}