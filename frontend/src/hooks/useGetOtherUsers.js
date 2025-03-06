import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getOtherUsers, getProfile } from '../redux/userSlice'


const useGetOtherUsers =  (id)=>{
      const dispatch = useDispatch()

    useEffect(()=>{

        let fetchOtherUsers =async ()=>{
            try{
                const res = await axios.get(`${USER_API_END_POINT}/getOtherUsers/${id}`,{
                 withCredentials:true,
                 
                })
              
                dispatch(getOtherUsers(res?.data?.otherUser))
             }catch(err){
         
             }
         
        }
       fetchOtherUsers()
    },[id])
   


}

export default useGetOtherUsers