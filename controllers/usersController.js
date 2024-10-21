import { UserModel } from "../models/users.js";
import { loginUserValidator, registerUserValidator } from "../validators/usersValidator.js";

export const registerUser = async (req, res, nest) => {
    // try {
    //     // Validate user input
    const { error, value } = registerUserValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error)
    }
    //     // check if user does not exist
    const user = await UserModel.findOne({email: value.email})
    if (user){
        return res.status(409).json('User already exists')
    }
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
        const { error, value } = loginUserValidator.validate(req.body)
        if (error) {
            return res.status(422).json(error)
        }
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

export const logoutUser = (req, res, next) => {
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