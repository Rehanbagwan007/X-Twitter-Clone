import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { TWEET_API_END_POINT } from '../utils/constant'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getOtherUsers, getProfile } from '../redux/userSlice'


const useGetProfile =  (id)=>{
      const dispatch = useDispatch()

    useEffect(()=>{

        let fetchProfile =async()=>{
            try{
                const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`,{
                 withCredentials:true,
                 
                })
                dispatch(getProfile(res.data.user))
             }catch(err){
         
             }
         
        }
       fetchProfile()
    },[id])
   


}

export default useGetProfile