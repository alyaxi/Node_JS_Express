const router = require("express").Router();
let product = require("../data");
const fs = require("fs");
const ErrorHandler = require("../erros/ErrorHandler");
const apiKeyMiddleware = require("../middleware/apiKey");


router.get("/products", (req, res) => {
    res.render("products", {
      title: "Products Page",
    });
  });

router.get("/api/products", (req, res) => {
  res.json(product);
})

router.post("/api/products", (req, res, next) => {

  // try {
  //   console.log(age);
  // } catch (error) {
  //   next(ErrorHandler.internalServerError(error.message));
  // }
  const {name, price} = req.body;
  if(!name || !price) {
    next(ErrorHandler.validationError());
    // throw new Error("Name and Price are required");
  }
  const productItem = {
    name,
    price,
    id: new Date().getTime().toString()
  }
  product.push(productItem);
  res.json(productItem);

})

router.delete("/api/products/:id", (req, res) => {
  const {id} = req.params;
  console.log(id);
  product = product.filter(item => item.id !== id);
  res.json({
    message: "Product deleted successfully"
  })
})




module.exports = router;