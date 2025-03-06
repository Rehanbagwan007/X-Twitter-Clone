import React from 'react'
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import { Home } from './Home'
import { Login } from './Login'
import { Feed } from './Feed'
import { Profile } from './Profile'
import { LeftSidebar } from './LeftSidebar'
import { RightSidebar } from './RightSidebar'
import { RightSideBarMobile } from './RightSideBarMobile'


export const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path:"/",
            element:<Home/>,
            children:[
              {
                path:"/",
                element:<Feed/>
              },{
                path:"/profile/:id",
                element:<Profile/>
              },
              {
               
                path:"/Search",
                element:<RightSideBarMobile/>
      
             
              
             
            }
            ]
        },
        {
          path:"/login",
          element:<Login/>,
        },
        
        

    ])
  return (
    <RouterProvider router={appRouter}/>
  )
}
