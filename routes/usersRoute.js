import { Router } from "express";
import { loginUser, logoutUser, getUserProfile, registerUser,updatedProfile} from "../controllers/usersController.js";


const userRoute = Router();


userRoute.post('/user/register',registerUser)

userRoute.post('/user/login',loginUser)

userRoute.post('/user/logout',logoutUser)

userRoute.get('/user/profile',getUserProfile)

userRoute.patch('/users/me',updatedProfile)


export default userRoute