import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModels.js";
import ProductColorRelation from "../models/colorRelationModel.js";


const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            originalPrice,
            category,
            subCategory,
            sizes,
            bestseller,
            productGroupId,
            color_id
        } = req.body;

        // Accessing files
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        const images = [image1, image2, image3, image4].filter(Boolean);

        // Upload to Cloudinary
        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, {
                    resource_type: "image",
                });
                return result.secure_url;
            })
        );

        // Parse sizes if needed
        let parsedSizes = [];
        if (
            category.toLowerCase() === "cloths" ||
            category.toLowerCase() === "clothing" ||
            category.toLowerCase() === "cloth"
        ) {
            try {
                parsedSizes = JSON.parse(sizes);
                if (!Array.isArray(parsedSizes)) throw new Error("Invalid sizes array");
            } catch {
                return res.json({
                    success: false,
                    message: "Invalid sizes format. It should be a JSON array.",
                });
            }
        }

        // Final groupId logic
        const finalGroupId = productGroupId;

        // Create product
        const product = new productModel({
            name,
            description,
            price: Number(price),
            originalPrice: Number(originalPrice),
            image: imagesUrl,
            category,
            subCategory,
            sizes: parsedSizes,
            bestseller: bestseller === "true",
            productGroupId: finalGroupId ? finalGroupId : "",
        });

        const savedProduct = await product.save();


        if (finalGroupId && finalGroupId.trim() !== "") {
            if (!color_id) {
                return res.json({ success: false, message: "Color ID is required." });
            }
            const colorRelation = new ProductColorRelation({
                group_id: finalGroupId,
                product_id: savedProduct._id,
                color_id,
            });

            await colorRelation.save();
        }

        res.json({
            success: true,
            message: "Product and Color Relation added successfully",
            product: savedProduct,
        });

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};




// function for list product

const listProduct = async (req, res) => {
    try {
        const products = await productModel.find(); // fetching all products
        res.json({ success: true, products });
    } catch (error) {
        console.error("Error listing products:", error);
        res.json({ success: false, message: "Internal server error" });
    }
};


// function for remove product

const removeProduct = async (req, res) => {
    try {
        const productId = req.body?.id;

        await productModel.findByIdAndDelete(productId);

        await ProductColorRelation.deleteOne({ product_id: productId });


        res.json({ success: true, message: "Product & Related Color Relations Removed Successfully" });

    } catch (error) {
        console.error("Error Removing product:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


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


const getAllGroupIdData = async (req, res) => {
    const groupId = req.query.groupId;
    try {

        if (!groupId) {
            return res.json({ success: false, message: "Group ID is required" });
        }
        const data = await ProductColorRelation.find({ group_id: groupId })
            .populate("product_id")
            .populate("color_id");

        if (!data || data.length === 0) {
            return res.json({ success: false, message: "No records found" });
        }

        const formatted = data.map((item) => ({
            productId: item.product_id._id,
            productName: item.product_id.name,
            slug: item.product_id.slug,
            colorId: item.color_id,
            colorName: item.color_id.colorName,
            colorHex: item.color_id.colorHex,
        }));

        res.json({ success: true, data: formatted });
    } catch (error) {
        console.error("Error fetching group data:", error);
        res.json({ success: false, message: "Internal server error" });
    }
}


const getPaginateProduct = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    try {
        const totalProducts = await productModel.countDocuments();
        const products = await productModel.find().skip(skip).limit(limit);

        res.json({
            success: true,
            data: products,
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
};





export { addProduct, listProduct, removeProduct, singleProduct, getPaginateProduct, getAllGroupIdData };
