import mongoose,{ Schema, model} from "mongoose"

//schema
const userSchema= new Schema({
      userName : {
        type:String,
        required:true,
        min:3,
        max:20
            },
    
        email: {
            type:String,
            unique:true,
            required:true,
            lowercase: true
        },
        password: {
            type:String,
            required:true
        },
        gender :{
            type :String,
            enum:['male' , 'female']
        },
        phone:{type:String},
         status:{
            type:String,
            enum:['online' ,'offline'],
            default:"offline"
        } ,
        role: {
            type: String,
            enum: ['user' , 'admin'],
            default:'user'
        }  ,
        isConfirmed: {
            type: Boolean,
            default:false
        },
        forgetCode:String ,
        activationCode:String,
        profileImage : {
            url :{
                type :String,
                defualt :"https://res.cloudinary.com/dhu802c5r/image/upload/v1691227662/E-commerceDefualt/user/unkown_llww4s.jpg"
            },
            id :{
                type: String,
                defualt :"E-commerceDefualt/user/unkown_llww4s"
            }
        },
        coverImages : [{url : {type:String , required : true} , id:{type: String , required:true}}]
},{timestamps:true})


//Model

export const User=mongoose.model.User || model('User' ,userSchema)