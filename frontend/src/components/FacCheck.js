import React, { useState } from 'react'
import axios from 'axios'

export const FacCheck = ( description ) => {

    const [fact, setfact] = useState("")

    const factCheckApi = async ()=>{

        try{
              
            const res = await axios.post(`http://localhost:8080/api/v1/tweet//tweet-factCheck`,{claim:description} ,{
                headers:{
                  "Content-Type":"application/json"
                },
                withCredentials:true
              } )
              console.log(res)
              if(res?.data?.response){

                setfact(res.data.response)



              }
        }    

          


        catch(err){

        }


    }


  factCheckApi()


  return (
    setfact
  )
}
