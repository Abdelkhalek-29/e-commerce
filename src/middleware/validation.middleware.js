import {Types} from "mongoose"
export const isValidObjectId = (value , helper) =>{
    return Types.ObjectId.isValid(value) 
     ? true
     : helper.error("Invalid objectid !")
}

export const isValid = (schema) => {
 return(req,res,next)=>{
    const copyReq = {...req.body , ...req.params , ...req.query}
    const validationResult = schema.validate(copyReq , {abortEarly : false})
    if (validationResult.error) {
       // const messages=validationResult.error.details.map((error)=>error.messages)
       // return next(new Error(messages) ,{cause :400})
       return res.json({message:"validation Error",validationError:validationResult.error.details})
    }
    return next()
}
}