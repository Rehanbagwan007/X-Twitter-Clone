import React from 'react'
import Avatar from 'react-avatar';
import { CiImageOn } from "react-icons/ci";

export const CreatePost = () => {
  return (
    <div className='w-full md:w-[100%] h-full '>
      <div className="">
      <div className='flex items-center justify-evenly border-b w-full'>
            <div className='cursor-pointer hover:bg-gray-200 w-full text-center px-3 py-4 rounded'>
              <h1 className='font-bold text-gray-600'>For You</h1>
              </div>
          
            <div className='cursor-pointer hover:bg-gray-200 w-full text-center px-3 py-4 rounded'>
              <h1 className='font-bold text-gray-600'>Following</h1></div>
            </div>
            </div>

            <div className=' flex'>
              <div className='flex flex-row items-center p-3'>
                <div><Avatar  src='https://img.freepik.com/premium-photo/young-male-cartoon-developer-coding-badass-black-short_1057389-529.jpg?w=740' googleId="118096717852922241760" size="40" round={true} /></div>
              </div>
              <input type='text' className="w-full outline-none text-lg ml-2" placeholder='What Is Happening?'></input>
            </div>
            <div className='flex justify-between items-center  border-b border-gray-300 p-1.5'>
              <div className='ml-3'><CiImageOn className='text-blue-600 ' size={'25px'}/></div>
            <div>
              <button className='bg-blue-500 rounded-full px-4 py-2 text-white'>Post</button>
            </div>


            </div>
           

               

       

    


       
    </div>
  )
} 