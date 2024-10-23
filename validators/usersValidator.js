import Joi from "joi";

export const registerUserValidator = Joi.object({
    name: Joi.string().required(),
    businessName: Joi.string().required(),
    email: Joi.string().email().required().lowercase(),
    phone:Joi.string().required().pattern(/^[0-9]+$/).length(10),
    password: Joi.string().min(6).required(),
    confirmPassword:Joi.string().valid(Joi.ref('password')).required(),
    location:Joi.string().required(),
    avatar:Joi.string().optional().allow(null),
    role: Joi.string().valid('user','vendor','admin')
})

export const loginUserValidator = Joi.object({

    email: Joi.string().email().required(),
    //userName:Joi.string().required(),
    password: Joi.string().required()
})

export const updatedProfileValidator = Joi.object({
    businessName: Joi.string(),
    avatar:Joi.string(),
    location:Joi.string(),
    phone:Joi.string().pattern(/^[0-9]+$/).length(10),
})