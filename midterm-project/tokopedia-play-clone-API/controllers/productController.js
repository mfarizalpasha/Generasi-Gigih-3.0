// controllers/productController.js
const { Product, Video } = require("../models");

// Fungsi untuk mendapatkan daftar produk
exports.getProductList = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fungsi untuk mendapatkan detail produk berdasarkan ProductID
exports.getProductDetail = async (req, res) => {
  try {
    const productID = req.params.productID;

    const product = await Product.findOne({ productID });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Fungsi untuk menambahkan product baru
exports.addProduct = async (req, res) => {
  try {
    const { link, title, price, videoID, productID } = req.body;

    if (!link || !title || !price || !videoID || !productID) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Verifikasi apakah videoID yang diberikan ada di koleksi video
    const existingVideo = await Video.findOne({ videoID });

    if (!existingVideo) {
      return res
        .status(404)
        .json({ error: "Video not found for the given videoID" });
    }

    const existingProduct = await Product.findOne({ productID });

    if (existingProduct) {
      return res.status(409).json({ error: "ProductID already exists" });
    }

    // Lanjutkan dengan menambahkan product jika videoID valid
    const newProduct = new Product({ link, title, price, videoID, productID });
    await newProduct.save();

    res.json({ success: "Product added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to add product" });
  }
};

// Fungsi untuk mengupdate product berdasarkan ProductID
exports.updateProduct = async (req, res) => {
  try {
    const productID = req.params.productID;
    const { link, title, price } = req.body;
    if (!link || !title || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Verifikasi apakah product dengan productID yang diberikan ada di koleksi product
    const existingProduct = await Product.findOne({ productID });

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Lanjutkan dengan mengupdate product jika productID valid
    await Product.findOneAndUpdate(
      { productID },
      { link, title, price },
      { new: true }
    );

    res.json({ success: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "fail to update product" });
  }
};

// Fungsi untuk menghapus product berdasarkan ProductID
exports.deleteProduct = async (req, res) => {
  try {
    const productID = req.params.productID;

    // Verifikasi apakah product dengan productID yang diberikan ada di koleksi product
    const existingProduct = await Product.findOne({ productID });

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Lanjutkan dengan menghapus product jika productID valid
    await Product.findOneAndRemove({ productID });

    res.json({ success: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};
