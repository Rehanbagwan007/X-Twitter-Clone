import express from 'express'
import { createTweet, deleteTweet, getAllTweet, likeTweet, userFollowingTweets } from '../controllers/tweetController.js'
const tweetRouter = express.Router()
import { authentication } from '../config/auth.js'
import { aiWritePost, factChecker } from '../controllers/aiController.js'
import { upload } from '../middlewares/multer.js'


tweetRouter.route("/create").post(authentication,upload.single("file"),createTweet)
tweetRouter.route("/delete/:id").delete(authentication,deleteTweet)
tweetRouter.route("/like/:id").put(authentication,likeTweet)
tweetRouter.route("/Tweets").get(authentication,getAllTweet)
tweetRouter.route("/tweetsFollowing/:id").get(authentication,userFollowingTweets)
tweetRouter.route("/tweet-factCheck").post(authentication,factChecker)
tweetRouter.route("/tweet-genreate").post(authentication,aiWritePost)



export default tweetRouter


