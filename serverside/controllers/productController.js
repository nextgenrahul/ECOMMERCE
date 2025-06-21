import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModels.js";
// function for add product
const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestseller,
        } = req.body;

        // Accessing files
        const image1 = req.files.image1?.[0];
        const image2 = req.files.image2?.[0];
        const image3 = req.files.image3?.[0];
        const image4 = req.files.image4?.[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // Upload to Cloudinary
        
        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image",
                });
                return result.secure_url;
            })
        );

        let parsedSizes;
        try {
            parsedSizes = JSON.parse(sizes);
            if (!Array.isArray(parsedSizes)) throw new Error("Invalid sizes array");
        } catch {
            return res.status(400).json({ success: false, message: "Invalid sizes format. It should be a JSON array." });
        }

        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesUrl,
            category,
            subCategory,
            sizes: parsedSizes,
            bestseller: bestseller === "true",
            date: new Date(),
        };

        const product = new productModel(productData);
        await product.save();

        res.status(201).json({ success: true, message: "Product added successfully" });

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


// function for list product
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.error("Error Listing product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// function for remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body?.id);
        res.json({ success: true, message: "Product Removed Successfull" });

    } catch (error) {
        console.error("Error Removing product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// function for single product
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        if (product) {
            res.json({ success: true, product })
        }
    } catch (error) {
        console.error("Error while fetch sigle product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export { addProduct, listProduct, removeProduct, singleProduct };
