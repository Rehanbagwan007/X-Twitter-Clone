
import { GoogleGenerativeAI } from "@google/generative-ai";
import  dotenv  from "dotenv";


dotenv.config({
   path:".env"
})

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash",
   systemInstruction:`
   Analyze the given tweet and fact-check its claim. If the claim is true, return a simple confirmation message stating that the tweet is true. If the claim is false, return a response stating that the tweet is false and provide the correct information in an easy-to-understand format. If the claim cannot be verified, return a message stating that verification is not possible. Ensure the response is clear, user-friendly, and free from unnecessary formatting or code blocks.


   `
 });


 

async function generateContent(prompt) {

    
const result = await model.generateContent(prompt);
    

     return result.response.text()
}


//const prompt = "Explain how AI works";

//console.log(result.response.text());

export default generateContent