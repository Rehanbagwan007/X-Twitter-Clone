import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRouter.js'
import tweetRouter from './routes/tweetRouter.js'
import cors from "cors"
import path from 'path'


dotenv.config({ path: ".env" })

connectDB()

const __dirname = path.resolve()
const app = express()


app.set("trust proxy", 1)

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
    credentials: true, 
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)



// ✅ Middlewares (Correct Order)
app.use(express.json()) // Parses JSON requests
app.use(express.urlencoded({ extended: true })) // Parses URL-encoded data
app.use(cookieParser()) // Parses cookies

// ✅ Routes
app.use("/api/v1/user", userRouter)
app.use("/api/v1/tweet", tweetRouter)


app.use(express.static(path.join(__dirname, "/frontend/build")))
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
})

app.use((err, req, res, next) => {
  console.error("Server Error:", err.message)
  res.status(500).json({ error: "Internal Server Error" })
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Server Running on Port ${PORT}`)
})
