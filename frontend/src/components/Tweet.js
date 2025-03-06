import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { FaComment } from 'react-icons/fa';
import { CiHeart, CiBookmark } from 'react-icons/ci';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { TWEET_API_END_POINT, USER_API_END_POINT } from '../utils/constant';
import { getRefresh } from '../redux/tweetSlice';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { LuShieldQuestion } from "react-icons/lu";
import { FacCheck } from './FacCheck';
import {Typewriter} from "react-simple-typewriter"


export const Tweet = ({ tweets }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);

  const [like, setLike] = useState(false);

  const likeTweet = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        { withCredentials: true }
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
        setLike(!like);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteTweet = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
      dispatch(getRefresh());
      if (res?.data?.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const bookmarkHandler = async (id) => {
    try {
      const res = await axios.put(
        `${USER_API_END_POINT}/bookmark/${id}`,
        { id: user?._id },
        { withCredentials: true }
      );
      dispatch(getRefresh());
      if (res?.data?.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [fact, setfact] = useState("")

  const factCheckApi = async (description)=>{

      try{
            
          const res = await axios.post(`${TWEET_API_END_POINT}//tweet-factCheck`,{claim:description} ,{
              headers:{
                "Content-Type":"application/json"
              },
              withCredentials:true
            } )
            
            if(res?.data?.response){

              setfact(res?.data?.response)



            }
      }    

        


      catch(err){
         console.log(err);
         
      }


  }

  return (
    <div className='dark:bg-black dark:text-white   mt-4 w-full'>
      <div className='ml-2 w-full border-b'>
        <div className='flex'>
          <Avatar 
            googleId='118096717852922241760' 
            size='42' 
            round={true} 
            src='https://img.freepik.com/premium-photo/speech-therapist-digital-avatar-generative-ai_934475-9023.jpg'
          />
          <div className='ml-2 w-[80%]'>
            <div className='flex flex-col'>
              <h1 className='font-bold'>{tweets?.userID?.name}</h1>
              <p className='text-gray-500 text-sm'>@{tweets?.userID?.username}</p>
              <p>{tweets?.description}</p>
            </div>

            <div>
              <img src={tweets?.mediaUrl}   />
            </div>
            
            <div className='flex justify-between mt-1.5 items-center'>
              <div className='flex items-center gap-1'>
                <FaComment className='hover:bg-green-200 cursor-pointer' />
                <p>0</p>
              </div>
              
              <div className='flex items-center gap-1' onClick={() => likeTweet(tweets?._id)}>
                <CiHeart className='hover:bg-yellow-200 cursor-pointer' />
                <p>{tweets?.likes?.length} Likes</p>
              </div>
              
              <div className='flex items-center gap-1' onClick={() => bookmarkHandler(tweets._id)}>
                <CiBookmark className='hover:bg-blue-200 cursor-pointer' />
              </div>
              
              {user?._id === tweets?.userID?._id && (
                <div className='flex items-center gap-1' onClick={() => deleteTweet(tweets?._id)}>
                  <RiDeleteBin7Line className='hover:bg-red-200 cursor-pointer' />
                </div>
              )}

              <div>
                <button className="text-black cursor-pointer"  ><LuShieldQuestion className='dark:text-white' onClick={(()=>{
                  factCheckApi(tweets.description)
                })}  /></button>
              </div>
            </div>
            
            {/* Additional div for Mock, Mark, Delete, and Rumor Check */}
            <div className='flex  mt-2 p-2  '>
                
                   { fact || ""}

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
