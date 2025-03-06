import React from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import Avatar from "react-avatar";
import { useSelector,useDispatch } from "react-redux";
import useGetProfile from '../hooks/useGetProfile';
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast"
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';





export const Profile = () => {
  const {user , profile} = useSelector(store => store.user)
  const dispatch = useDispatch()
 // useGetProfile(user?._id)
  const {id} = useParams()
  useGetProfile((id))

  const followAndUnfollowHandler = async () => {
    if(user.following.includes(id)){
        // unfollow
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {id:user?._id});
            console.log(res);
            dispatch(followingUpdate(id));
             dispatch(getRefresh)
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
        
    }else{
        // follow
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {id:user?._id});
            console.log(res);
            dispatch(followingUpdate(id));
            dispatch(getRefresh());
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }}

  return (
    <div className='md:w-[50%] w-full h-full'>
      <div className='w-full'>
        <div className='flex-col md:flex-row items-center py-2'>
          <Link to="/" className='rounded-full hover:bg-gray-100 cursor-pointer'>
            <IoArrowBackOutline size={'20px'}/>
          </Link>
          <div className='ml-2 flex flex-col '>
            <h1 className='font-bold text-lg'>{profile?.name}</h1>
            <p className='text-gray-500 text-sm flex flex-row items-center gap-1'>
              {profile?.tweets?.length}<span>Posts</span>
            </p>
          </div>
        </div>

        {/* Banner Image Container */}
        <div className='relative w-full'>
          <img src='https://cdn.hashnode.com/res/hashnode/image/upload/v1642747175034/ghHOuGPWO.png' className='w-full' />
          
          {/* Avatar Positioned Above Banner */}
          <div className='absolute bottom-[-45px] left-0 border-4 border-white rounded-full'>
            <Avatar src='https://img.freepik.com/premium-photo/young-male-cartoon-developer-coding-badass-black-short_1057389-529.jpg?w=740' googleId="118096717852922241760" size="130" round={true} />
          </div>
        </div>

        {}

        <div className='text-right m-4'>

        {
                        profile?._id === user?._id ? (
                            <button className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>Edit Profile</button>

                        ) : (
                            <button onClick={()=>{ followAndUnfollowHandler()
                            
                            }} className='px-4 py-1 bg-black text-white rounded-full'>{user?.following?.includes(id) ? "Following" : "Follow"} </button>
                        )
                    }
         
        </div>

        <div>
          <h1 className='font-bold text-xl'>{profile?.name}</h1>
          <p>@{profile?.username}</p>
        </div>
        <div>
          <p>💻 Passionate Full Stack MERN Developer | 🚀 Building scalable web apps with MongoDB, Express.js, React.js, and Node.js.
          🔧 Love problem-solving, clean code & creating seamless user experiences!</p>
        </div>
      </div>
    </div>
  )
}
