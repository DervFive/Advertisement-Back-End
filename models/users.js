import { Schema, model } from "mongoose";
import { toJSON } from '@reis/mongoose-to-json'
import { required } from "joi";


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userName:{
        type: String,
        required:true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [
            'vendor', 'user', 'admin'
        ],
        default: 'user'
    }
},{timestamps:true})

userSchema.plugin(toJSON)

export const UserModel = model('User', userSchema)
