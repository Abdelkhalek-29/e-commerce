import slugify from "slugify";
import {Brand } from "../../../DB/models/brand.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import cloudinary from "../../utils/cloud.js";


//create brand
export const createBrand= asyncHandler(async(req,res,next) =>{
   
    //file
    if(!req.file) return next(new Error("brand image is required !"))
    const {secure_url ,public_id} = await cloudinary.uploader.upload(
        req.file.path,
        {folder:`${process.env.FOLDER_CLOUD_NAME}/brand` }
    )
        //save brand in db
    const brand = await Brand.create({
            name: req.body.name ,
            createdBy:req.user._id,
            image:{ id:public_id , url:secure_url},
            slug:slugify(req.body.name)
        })
    return res.status(201).json({success : true  , results:brand})
})                   


// update brand
export const updateBrand = asyncHandler(async(req,res,next) =>{
    //check brand
    const brand = await Brand.findById(req.params.brandId )
    if(!brand) return next(new Error("brand not found !"));

    // check owner
if(req.user._id.toString() !== brand.createdBy.toString())
return next(new Error("You aren't authorized !"))

    //name
    brand.name = req.body.name ? req.body.name : brand.name;

    //slug
    brand.slug = req.body.name ? slugify(req.body.name) : brand.slug
    // files
    if(req.file){
        const {public_id,secure_url} = await cloudinary.uploader.upload(
            req.file.path,
            {
                public_id: brand.image.id,
            }
        )
        brand.image.url = secure_url
    }
    //save category
    await brand.save();
    return res.json({success : true ,  message:"brand updataed successfully"})

})


//delete brand
export const deleteBrand = asyncHandler(async(req, res,next) =>{
    //check brand
    const brand = await Brand.findById(req.params.brandId)
    if(!brand) return next(new Error("Invalid brand id !"))

    // check owner
if(req.user._id.toString() !== brand.createdBy.toString())
return next(new Error("You aren't authorized !"))

    //delete image
    const result = await cloudinary.uploader.destroy(brand.image.id);
    console.log(result)

    //delete brand
   // await brand.remove();
   await Brand.findByIdAndDelete(req.params.brandId)

    return res.json({success:true , message : "category deleted !" })
})

//Get categories
export const allBrands=asyncHandler(async(req,res,next) =>{
    const brands = await Brand.find()
    return res.json({ success:true , result:brands })
})