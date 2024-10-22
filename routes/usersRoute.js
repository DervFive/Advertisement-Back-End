import { Router } from "express";
import { loginUser, logoutUser, getUserProfile, registerUser,updatedProfile} from "../controllers/usersController.js";
import { upload } from "../middlewares/upload.js";
import { hasPermission, isAuthentication } from "../middlewares/auth.js";



const userRoute = Router();


userRoute.post('/user/register',registerUser)

userRoute.post('/user/login',loginUser)

userRoute.post('/user/logout',logoutUser)

userRoute.get("/user/profile", hasPermission("get_profile"), getUserProfile);

userRoute.patch("/users/me",isAuthentication, hasPermission("update_profile"),upload.single("avatar"),updatedProfile
);


export default userRoute