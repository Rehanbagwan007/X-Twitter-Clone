
import { GoogleGenerativeAI } from "@google/generative-ai";
import  dotenv  from "dotenv";


dotenv.config({
   path:".env"
})

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash",
   systemInstruction:`
    Generate an engaging and contextually relevant tweet based on the given topic or prompt. Ensure that:
  
  - The tweet is concise (within 280 characters).
  - The content aligns with real-world trends and user interests.
  - The tone matches the provided context (informative, humorous, motivational, or casual).
  - The generated tweet avoids controversial, offensive, or misleading information.
  - If no prompt is provided, generate a general trending tweet based on recent events or popular discussions.

  The output should be a plain text tweet without extra formatting or code blocks.
  `

   
 });


 

 

async function generatePost(prompt) {

    
const result = await model.generateContent(prompt);
    
   
    
     return result.response.text()
}


//const prompt = "Explain how AI works";

//console.log(result.response.text());


export default generatePost