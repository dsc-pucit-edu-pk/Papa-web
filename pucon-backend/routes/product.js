const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Favourite = require("../models/Favourite");
const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  console.log("reqbody");

  let obj = {
    title: req.body.title || "",
    desc: req.body.desc || "",
    img: req.body.img || "",
    cost_price: +req.body.cost_price || 0,
    market_price: +req.body.market_price || 0,
    quantity: +req.body.quantity || 1,
    product_type: req.body.product_type || "game",
    minimum_age: req.body.minimum_age || 2,
    company_name: req.body.company_name || "",
  };
  console.log(obj);
  const newProduct = new Product(obj);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  console.log("req came");
  let obj = {
    title: req.body.title || "",
    desc: req.body.desc || "",
    img: req.body.img || "",
    cost_price: +req.body.cost_price || 0,
    market_price: +req.body.market_price || 0,
    quantity: +req.body.quantity || 1,
    product_type: req.body.product_type || "game",
    minimum_age: req.body.minimum_age || 2,
    company_name: req.body.company_name || "",
  };
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: obj,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    console.log("ahhhh");
    console.log(req.params.id);
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const userType = req.query.userType;
  console.log(userId);
  try {
    let products = await Product.find();
    if (userId && userType === "customer") {
      const favourites = await Favourite.find({ userId: userId });
      console.log(favourites);
      products = products.map((p) => {
        const favourite = favourites.find(
          (f) => f.productId.toString() === p._id.toString()
        )
          ? true
          : false;
        return { ...p._doc, favourite };
      });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/favourite", verifyToken, async (req, res) => {
  const productId = req.body.productId;
  const userId = req.user.id;
  console.log(productId, userId);
  const newFavourite = new Favourite({
    productId: productId,
    userId: userId,
  });
  try {
    const savedFavourite = await newFavourite.save();
    res.status(200).json(savedFavourite);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
