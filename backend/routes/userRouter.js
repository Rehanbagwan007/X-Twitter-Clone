import { authentication } from "../config/auth.js"
import { bookmarkTweet, follow,  getOtherUsers, getProfile, Login, Logout, Register, unfollow } from "../controllers/userContoller.js"
import express from 'express'

const userRouter = express.Router()


userRouter.route("/register").post(Register)
userRouter.route("/login").post(Login)
userRouter.route("/logout").get(Logout)
userRouter.route("/bookmark/:id").put(authentication,bookmarkTweet)
userRouter.route("/profile/:id").get(authentication,getProfile)
userRouter.route("/getOtherUsers/:id").get(authentication,getOtherUsers)
userRouter.route("/follow/:id").post(authentication,follow)
userRouter.route("/unfollow/:id").post(authentication,unfollow)

export default userRouter