import { Product } from "../../../DB/models/product.model.js";
import { Review } from "../../../DB/models/reviews.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const addReview = asyncHandler(async (req, res, next) => {
  const { content, productId } = req.body;

  const review = await Review.create({
    user: req.user._id,
    content,
  });

  const product = await Product.findByIdAndUpdate(productId, {
    $push: { reviews: { id: review._id } },
  });
  return res.json({success:true,message:"review add successfully"})
});
