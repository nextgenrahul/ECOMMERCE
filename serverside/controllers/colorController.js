import ColorModel from "../models/colorModels.js";

const addColor = async (req, res) => {
    const { color, colorHex } = req.body;
    try {
        if (!color || color.trim() === "") {
            return res.json({ success: false, message: "Color is required." });
        }

        if (!colorHex || colorHex.trim() === "") {
            return res.json({ success: false, message: "ColorHex is required." });
        }

        const existing = await ColorModel.findOne({ colorName: color.trim() });

        if (existing) {
            return res.json({ success: false, message: "Color already exists." });
        }

        // Save color
        const colorObj = await ColorModel.create({
            colorName: color.trim(),
            colorHex: colorHex.trim()
        });

        if (colorObj) {
            return res.json({ success: true, message: "Color Added Successfully" });
        } else {
            return res.json({ success: false, message: "Error While adding color" });
        }

    } catch (error) {
        console.error("Add color error:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

const updateColor = async (req, res) => {
    const { colorId, color, colorHex } = req.body;

    try {
        if (!colorId || colorId.trim() === "") {
            return res.json({ success: false, message: "Color ID is required." });
        }

        if (!color || color.trim() === "") {
            return res.json({ success: false, message: "Color name is required." });
        }
        if (!colorHex || colorHex.trim() === "") {
            return res.json({ success: false, message: "colorHex is required." });
        }

        const existingColor = await ColorModel.findById(colorId);

        if (!existingColor) {
            return res.json({ success: false, message: "Color not found." });
        }

        existingColor.colorName = color.trim();
        existingColor.colorHex = colorHex.trim();

        const updatedColor = await existingColor.save();

        return res.json({
            success: true,
            message: "Color updated successfully.",
            data: updatedColor
        });

    } catch (error) {
        console.error("Error updating color:", error);
        return res.json({ success: false, message: "Server error", error: error.message });
    }
};

const deleteColor = async (req, res) => {
    const { colorId } = req.body;

    try {
        if (!colorId || colorId.trim() === "") {
            return res.json({ success: false, message: "Color ID is required." });
        }

        const existingColor = await ColorModel.findById(colorId);
        if (!existingColor) {
            return res.json({ success: false, message: "Color not found." });
        }

        await ColorModel.findByIdAndDelete(colorId);

        return res.json({
            success: true,
            message: "Color deleted successfully."
        });

    } catch (error) {
        console.error("Delete Color Error:", error);
        return res.json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

const getColorList = async (req, res) => {
    try {
        const colors = await ColorModel.find().sort({ createdAt: -1 }); 

        if (!colors || colors.length === 0) {
            return res.json({ success: false, message: "No colors found." });
        }

        return res.json({
            success: true,
            message: "Color list fetched successfully.",
            data: colors,
        });

    } catch (error) {
        console.error("Error fetching color list:", error);
        return res.json({
            success: false,
            message: "Server error while fetching color list.",
            error: error.message,
        });
    }
}

export {
    addColor,
    updateColor,
    deleteColor,
    getColorList,
}
