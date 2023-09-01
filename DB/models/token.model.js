import mongoose ,{Types , model, Schema} from 'mongoose'
import { String } from 'mongoose/lib/schema/index.js'

//schema
const tokenSchema= new Schema({
    token:{
        type:String,
        required: true
    },
    user:{
        type:Types.ObjectId,
        ref:'User'
    },
    isValid:{
        type:Boolean,
        default:true
    },
    agent:{
        type: String
    },
    expiredAt:{
        type: String
    }

})

//model
export const Token = mongoose.model.Token || model('Token' , tokenSchema)