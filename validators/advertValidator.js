import Joi from "joi";
import { Types } from "mongoose";

export const createAdvertValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  image: Joi.string().required(),
  createBy: Joi.string().required()

});

export const updateAdvertValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  image: Joi.string().required(),
  createdBy: Joi.string().required()
})