import Joi from "joi";

export const registerUserValidator = Joi.object({
    name: Joi.string().required(),
    userName:Joi.string().required(),
    email: Joi.string().required().lowercase(),
    password: Joi.string().required(),
    role: Joi.string().valid('user','vendor','admin')
})

export const loginUserValidator = Joi.object({
    userName:Joi.string().required(),
    password: Joi.string().required()
})

export const updatedProfileValidator = Joi.object({
    userName: Joi.string(),
    avatar:Joi.string()
})