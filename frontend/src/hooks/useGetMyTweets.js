import axios from 'axios'
import { TWEET_API_END_POINT, USER_API_END_POINT } from '../utils/constant'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getAllTweet } from '../redux/tweetSlice'


const useGetMyTweets =  ()=>{
      const dispatch = useDispatch()

      const {refresh , isActive } = useSelector(store => store.tweet)
      const {user} = useSelector(store => store.user)


      let fetchTweets =async()=>{
        try{
            const res = await axios.get(`${TWEET_API_END_POINT}/Tweets`,{
             withCredentials:true,
             
            })
                
             dispatch(getAllTweet(res.data.tweets))
           
              
         }catch(err){
     
               console.log(err)

        }
     
    }

    const tweetsFollowing = async ()=>{

        try{

            const res = await axios.get(`${TWEET_API_END_POINT}/tweetsFollowing/${user._id}` , {
                withCredentials:true
            })
        
           dispatch(getAllTweet(res.data.GetTweets[0]))

        }catch(error){
               console.log(error)
        }


    }
  

    useEffect(()=>{
          
        if(isActive){
            tweetsFollowing()
        }

        else{
            fetchTweets()
        }
    },[refresh , isActive])
   


}

export default useGetMyTweets