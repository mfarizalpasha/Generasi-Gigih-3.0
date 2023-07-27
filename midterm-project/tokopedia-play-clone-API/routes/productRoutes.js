const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getProductList);
router.get("/:productID", productController.getProductDetail);
router.post("/", productController.addProduct);
router.put("/:productID", productController.updateProduct);
router.delete("/:productID", productController.deleteProduct);

module.exports = router;
