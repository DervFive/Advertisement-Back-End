import { Schema, model } from "mongoose";
import { toJSON } from '@reis/mongoose-to-json'


const userSchema = new Schema({
    name:{
        type:String,
        
    },
    businessName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone:{
        type:String,
        required: true,
    },
    location:{
        type:String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avartar:{
        type:String,
        default:null
    },
    role: {
        type: String,
        enum: [
            'vendor', 'user', 'admin'],
        default: 'user'
    },

},{timestamps:true})

userSchema.plugin(toJSON)

export const UserModel = model('User', userSchema)
