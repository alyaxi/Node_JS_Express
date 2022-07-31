const router = require("express").Router();
const apiKey = require("../middleware/apiKey");
const productsRoutes = require("../routes/products");
//Router base path middleware
// router.use(apiKey)
router.use(productsRoutes);

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
  });
});
router.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
  });
});


// router.get("/api/products", apiKey, (req, res) => {
//   res.json([
//     {
//       name: "Product 1",
//       price: 10,
//       description: "This is product 1",
//     },
//     {
//       name: "Product 2",
//       price: 20,
//       description: "This is product 2",
//     },
//   ]);
// });

module.exports = router;
