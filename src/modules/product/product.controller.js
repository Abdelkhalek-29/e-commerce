import { asyncHandler } from "../../utils/asyncHandler.js";
import { nanoid } from "nanoid";
import cloudinary from "../../utils/cloud.js";
import { Product } from "../../../DB/models/product.model.js";
import { Category } from "../../../DB/models/category.model.js";
import { Subcategory } from "../../../DB/models/subcategory.model.js";
import { Brand } from "../../../DB/models/brand.model.js";

// create product
export const addProduct = asyncHandler(async (req, res, next) => {
  // check category
  const category = await Category.findById(req.body.category);
  if (!category) return next(new Error("category nor found !", { cause: 404 }));

  // check subcategory
  const subcategory = await Subcategory.findById(req.body.subcategory);
  if (!subcategory)
    return next(new Error("subcategory not found", { cause: 404 }));

  // check brand
  const brand = await Brand.findById(req.body.brand);
  if (!brand) return next(new Error("brand not found", { cause: 404 }));

  // files
  if (!req.files)
    return next(new Error("Product images are required !", { cause: 400 }));

  //create unique folder name
  const cloudFolder = nanoid();
  let images = [];

  // upload sub files
  for (const file of req.files.subImages) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      { folder: `${process.env.FOLDER_CLOUD_NAME}/products/${cloudFolder}` }
    );
    images.push({ id: public_id, url: secure_url });
  }
  // upload default image
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.files.defaultImage[0].path,
    { folder: `${process.env.FOLDER_CLOUD_NAME}/product/${cloudFolder}` }
  );
  // create product
  const product = await Product.create({
    ...req.body,
    cloudFolder,
    createdBy: req.user._id,
    defaultImage: { url: secure_url, id: public_id },
    images,
  });
  // send response
  return res.status(201).json({ success: true, results: product });
});

// delete product
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.productId);
  if (!product) return next(new Error("product not found!"));

  // check owner
  if (req.user._id.toString() != product.createdBy.toString())
    return next(new Error("Not authorized", { cause: 401 }));

  const imagesArr = product.images; //[{id:,url:}]
  const ids = imagesArr.map((imageObj) => imageObj.id);
  console.log(ids);
  ids.push(product.defaultImage.id); //add odof default image

  // delete images
  const result = await cloudinary.api.delete_resources(ids);

  // delete folder
  await cloudinary.api.delete_folder(
    `${process.env.FOLDER_CLOUD_NAME}/products/${product.cloudFolder}`
  );

  // delete product from DB
  await Product.findByIdAndDelete(req.params.productId);

  //send response
  return res.json({ success: true, message: "product deleted successfully " });
});

// all product
export const allProducts = asyncHandler(async (req, res, next) => {

  if(req.params.categoryId){
    const category = await Category.findById(req.params.categoryId)
    if(!category) 
    return next(new Error("Category not dound !" ,{cause:404}))
  }

  const products = await Product.find({...req.query})
    .paginate(req.query.page)
    .customSelect(req.query.fields)
    .sort(req.query.sort);
  return res.json({ success: true, results: products });
});


// single product               /// problem !!!!
export const singleProduct = asyncHandler(async(req,res,next) =>{
  const product = await Product.findById(req.params.productId)
  return res.json({success: true , results:product}) 
})