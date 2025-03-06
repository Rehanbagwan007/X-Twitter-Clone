import React from 'react'
import { CreatePost } from './CreatePost'
import { Tweet } from './Tweet'
import { useSelector } from 'react-redux'


export const Feed = () => {

 const { tweets } = useSelector(store=>store.tweet)


  return (
    <>
    <div className='w-full md:w-[50%] rounded h-[95vh] overflow-y-scroll dark:bg-black'>
      
      <div className='w-full md:border'>
        <CreatePost/>
       

     {
        tweets?.map((post)=><Tweet key={post._id} tweets={post}/>)
       }
   
       
        
       



       

      </div>
     
  </div>
 </>
  )
}
