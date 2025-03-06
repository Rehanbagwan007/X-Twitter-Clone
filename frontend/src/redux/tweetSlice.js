import React from 'react'
import { createSlice } from '@reduxjs/toolkit'


const tweetSlice = createSlice({
    name:'tweet',
    initialState:{
        tweets:null,
        refresh:false,
        isActive:false
    },
    reducers:{
        getAllTweet:(state,action)=>{
            state.tweets = action.payload
        },
        getRefresh:(state)=>{
            state.refresh = !state.refresh
        }
        ,
        getisActive:(state,action)=>{
            state.isActive = action.payload
        }
        
    }
   
})

export const { getAllTweet , getRefresh , getisActive } = tweetSlice.actions
export default tweetSlice.reducer