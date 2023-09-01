import mongoose, { Schema, Types , model } from "mongoose";

//Schema
const categorySchema = new Schema( {
    name:{ type:String , required : true},
    slug: {type:String , required: true},
    image: {
        url: {type: String , required: true},
        id:{type:String , required : true}
    },
    createdBy: {type: Types.ObjectId , ref:"User" , required:true} ,
    brandId:{type:Types.ObjectId , ref:"Brand"}
},
{timestamps:true , toJSON:{virtuals:true} ,toObject:{virtuals:true} }
)

categorySchema.virtual("subcategory" ,{
    ref: "subcategory",
    localField: "_id", // category model
    foreignField:"categoryId" //subcategory model
})
//model
export const Category = mongoose.models.category || model("Category" , categorySchema)