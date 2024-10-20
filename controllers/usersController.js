import { UserModel } from "../models/users.js";

export const registerUser = (req, res, nest) => {
    // try {
    //     // Validate user input
    //     // check if user does not exist
    //     // hash user password
    //     // save user into the database
    //     // send user confirmation email
    //     // Respond to request
    //     res.status(201).json('User is registered')
    // } catch (error) {
    //     next(error)
    // }
    res.status(201).json('User is registered')
    console.log('hello world')
}


export const loginUser = (req, res, next) => {
    try {
        // Validate user input
        //  Find one user with identifier
        // compare their password
        // Sign a tokon for user
        // Responsd to request
        res.status(200).json('User is logged in')
    } catch (error) {
        next(error)
    }
}

export const getUserProfile = (req, res, next) => {
    try {
        // Find authenticated user from the database
        res.status(200).json('Welcome to your profile')
    } catch (error) {
        next(error)
    }
}

export const logoutUser = (req,res,next) => {
     try {
        res.status(200).json('User logout sucessfully')
     } catch (error) {
        
     }
}

export const updatedProfile = (req, res, next) => {
    try {
            
            res.status(200).json('Hello world')
    } catch (error) {
        
    }
    }