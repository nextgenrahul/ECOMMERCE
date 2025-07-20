import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModels.js";


const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;


    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear the user's cart after successful order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// Placig Orders using COD Method
const placeOrderStripe = async (req, res) => {
  const { orderId, success } = req.body;
  const userId = req.userId;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true })
      await userModel.findByIdAndUpdate(userId, { cartData: {} })
      res.json({ success: true });

    } else {
      await orderModel.findByIdAndDelete(orderId)
      res.json({ success: false })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {

}

// All Orders data for Admin Pannel

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    if (orders.length === 0) {
      return res.json({ success: false, message: "No orders have been submitted yet" });
    }

    return res.json({ success: true, message: "Orders fetched successfully", orders });

  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.json({ success: false, message: error.message });
  }
};

// User Order Data for frontend

const userOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await orderModel.find({ userId })
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}


// Update Order status from admin
const updateStatus = async (req, res) => {
  try {
    const { orderId, status, reason, payment } = req.body;

    if (status === "Delivered") {
      const order = await orderModel.findById(orderId);

      if (!order || !order.items || order.items.length === 0) {
        return res.json({ success: false, message: "Order not found or has no items" });
      }

      for (let item of order.items) {
        await productModel.updateOne(
          { _id: item.productId, "sizes.size": item.size },
          {
            $inc: {
              "sizes.$.stock": -item.quantity,
            }
          }
        );
      }

      order.status = "Delivered";
      order.payment = payment;
      order.reason = reason;
      await order.save();

      return res.json({ success: true, message: "Status Updated & Stock Decreased" });
    } else {
      await orderModel.findByIdAndUpdate(orderId, { status, reason, payment });
      return res.json({ success: true, message: "Status Updated" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Get Order Track result 
const trackerOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    console.log(orderId)
    const trackData = await orderModel.findOne({ _id: orderId });
    res.json({ success: true, trackData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}


export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, trackerOrder };




