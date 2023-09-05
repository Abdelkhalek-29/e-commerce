import authRouter from "./modules/auth/auth.router.js";
import categoryRouter from "./modules/category/category.router.js";
import subCategoryRouter from "./modules/subcategory/subcategory.router.js";
import brandRouter from "./modules/brand/brand.router.js";
import productRouter from "./modules/product/prouduct.router.js";
import couponRouter from "./modules/coupon/coupon.router.js";
import cartRouter from "./modules/cart/cart.router.js";
import orderRouter from "./modules/order/order.router.js";
import reviewRouter from "./modules/review/review.router.js"
export const appRouter = (app, express) => {
  //global middleware
  app.use((req, res, next) => {
    // req.orignalUrl
    if (req.originalurl === "/order/webhook") {
      return next();
    }
    express.json()(req, res, next);
  });
  app.use(express.json());
  //Routes
  //auth
  app.use("/auth", authRouter);

  //category
  app.use("/category", categoryRouter);

  // subcategory
  app.use("/subcategory", subCategoryRouter);

  // brand
  app.use("/brand", brandRouter);

  // prouduct
  app.use("/product", productRouter);

  // Coupon
  app.use("/coupon", couponRouter);

  // Cart
  app.use("/cart", cartRouter);

  // Review
  app.use("/review",reviewRouter)

  // order
  app.use("/order", orderRouter);
  app.all("*", (req, res, next) => {
    return next(new Error("Page not found !", { cause: 404 }));
  });

  //global error handeler
  app.use((error, req, res, next) => {
    return res
      .status(error.cause || 500)
      .json({ success: false, message: error.message, stack: error.stack });
  });
};
