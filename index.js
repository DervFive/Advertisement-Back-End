import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import userRoute from './routes/usersRoute.js';
import advertRouter from './routes/advertRoutes.js';




//create an express app
const app = express();

//use middlewares
// app.use (express.json())
app.use(express.json())
app.use (cors())

//use routes
app.use(advertRouter);
app.use(userRoute)


//listen for upcoming requests

const PORT = 3004

//connect to database
try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database is connected')
} catch (error) {
    console.log(error)
}
app.listen(PORT,() =>{
    console.log(`app is listening on port ${PORT}`)
})
