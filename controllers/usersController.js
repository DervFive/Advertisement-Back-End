import { UserModel } from "../models/users.js";
import { loginUserValidator, registerUserValidator, updatedProfileValidator } from "../validators/usersValidator.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { mailTransporter } from "../utils/mail.js";
export const registerUser = async (req, res, next) => {
    try {
        //     // Validate user input
        const { error, value } = registerUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error)
        }
        //     // check if user does not exist
        const user = await UserModel.findOne({ email: value.email })
        if (user) {
            return res.status(409).json('User already exists')
        }
        //     // hash user password
        const hashPassword = await bcrypt.hashSync(value.password, 12);
        //     // save user into the database
        await UserModel.create({ ...value, password: hashPassword })
        // send user confirmation email
        await mailTransporter.sendMail({
            to:value.email,
            subject:"User Registration ",
            text:"Account registered Successfully",
        })
        // Respond to request
        res.status(201).json('User is registered')
    } catch (error) {
        next(error)
    }
}


export const loginUser = async (req, res, next) => {
    try {
        // Validate user input
        const { error, value } = loginUserValidator.validate(req.body)
        if (error) {
            return res.status(422).json(error)
        }
        //  Find one user with identifier
        const user = await UserModel.findOne({
            email: value.email
        });
        if (!user) {
            return res.status(404).json('User does not exist')
        }
        // compare their password
        const correctPassword = bcrypt.compareSync(value.password, user.password);

        if (!correctPassword) {
           return res.status(401).json('Invalid password') 
        }
        // Sign a tokon for user
        const token = jwt.sign({id:user.id},process.env.JWT_PRIVATE_KEY,{expiresIn:'24h'})
        // Responsd to request
        res.status(200).json({message: 'User is logged in',accessToken:token})
    } catch (error) {
        next(error)
    }
}

export const getUserProfile = async (req, res, next) => {
    try {
        // Find authenticated user from the database
        const user = await UserModel.findById(req.auth.id).select({
            password:false
        })
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

export const logoutUser = (req, res, next) => {
    try {
        res.status(200).json('User logout sucessfully')
    } catch (error) {

    }
}

export const updatedProfile = async (req, res, next) => {
    try {
        // validate user input
         const {error,value}= updatedProfileValidator.validate({
           ...req.body,
             avatar:req.file?.filename
         })
        if (error) {
           res.status(422).json(error)
        }
        // Update user
         const updatedUser=await UserModel.findByIdAndUpdate(req.auth.id,value,{new:true});
         if (!updatedUser) {
            return res.status(404).json('User not found')
         }
        res.status(200).json('User profile updated successfully')
    } catch (error) {
        next(error)
    }
}