import userModel from "../models/userModel.js"; 

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; 

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({ success: true, message: "Product added to cart" });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ success: false, message: "Failed to add to cart", error: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (quantity === 0) {
      if (cartData[itemId] && cartData[itemId][size]) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ success: false, message: "Failed to update cart", error: error.message });
  }
};


const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ success: false, message: "Failed to get cart", error: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
