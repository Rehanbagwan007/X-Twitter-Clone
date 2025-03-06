import React, { useEffect , useState } from 'react'
import { LeftSidebar } from './LeftSidebar'
import { Feed } from './Feed'
import { RightSidebar } from './RightSidebar'
import { Outlet } from 'react-router-dom'
import { CiHome, CiSaveDown1 } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'
import useGetProfile from '../hooks/useGetProfile'
import { useSelector } from 'react-redux'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import useGetMyTweets from '../hooks/useGetMyTweets'
import { useNavigate } from 'react-router-dom'
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";


export const Home = () => {

   const nagivate =  useNavigate()
  const {user,otherUsers} = useSelector(store => store.user)

  useEffect(()=>{
    if(!user){
      nagivate("/login")
    }
  },[])

 

  useGetOtherUsers(user?._id)
  useGetMyTweets()

   const [Dark ,setDark] = useState(false)
    const toggleTheme = ()=>{
  
      setDark(!Dark)
      document.body.classList.toggle('dark')
     }

  return (
    <>
    <div className='md:hidden w-full h-[16%] p-4 items-centre sticky top-0'>

      <div className='flex flex-row items-center justify-between'>
        <div> <Avatar  src='https://img.freepik.com/premium-photo/young-male-cartoon-developer-coding-badass-black-short_1057389-529.jpg?w=740' googleId="118096717852922241760" size="40px" className="" round={true} /></div>
        <div className=''>
          <img src={`${Dark ? "https://i.pinimg.com/736x/1e/19/ab/1e19abe97dd93670084966606faae54c.jpg " : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRP8qRIaKUrrHgduMUnjoR-RWrpJbhsc2Fow&s "}`} className='w-[40px]' />
        </div>

        <div>
          <button className='px-2 py-2 rounded-full border' onClick={()=>toggleTheme()} >{
                      Dark ?   <MdLightMode  size={'20px'}/> : <MdDarkMode   size={'20px'}/>
                      
}</button>


        </div>

      </div>


    
    </div>
    

    <div className='flex justify-between md:w-[80%] w-full  mx-auto  md:p-1 '>

   

    <LeftSidebar />
    <Outlet/>
    <RightSidebar otherUsers={otherUsers}/>
    
    
  
   
    
    

    </div>




    <div className='md:hidden dark:bg-black dark:text-white w-full fixed top-[94%] flex items-center justify-around border-t pt-2.5 bg-white'>

<Link to="/" className='cursor-pointer'><CiHome size={'30'}/></Link>
<Link to="/Search" className='cursor-pointer'><CiSearch size={'30'}/></Link>
<Link to={`/profile/${user?._id}`} className='cursor-pointer'><CiUser size={'30'}></CiUser></Link>
<Link to={"/login"} className='cursor-pointer'><CiLogout size={'30'}/></Link>
</div> 
    
    
    </>
  )
}
