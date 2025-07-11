import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import ReturnModel from "../models/returnModel.js";
import productModel from "../models/productModels.js";
const createReturn = async (req, res) => {
  const { orderId, reason } = req.body;
  try {
    if (!orderId || !reason) {
      return res.json({ success: false, message: "All return values are required." });
    }

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found." });
    }

    const returnOrder = {
      status: "pending",
      reason: reason,
      comments: "Your order is in pending status.",
      requestedAt: Date.now()
    };

    await orderModel.findByIdAndUpdate(orderId, {
      returnOrder: returnOrder
    });

    return res.json({ success: true, message: "Return request created successfully." });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Server error: In order Controller' });
  }
};


const updateReturnStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, comments } = req.body;
    if (!status) {
      return res.json({ success: false, message: "Status is required." });
    }

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.json({ success: false, message: "Order not found." });
    }

    if (!order.returnOrder) {
      return res.json({ success: false, message: "Return order does not exist." });
    }

    order.returnOrder.status = status;
    order.returnOrder.comments = comments || order.returnOrder.comments;

    await order.save();

    return res.json({
      success: true,
      message: "Return status updated successfully.",
      returnOrder: order.returnOrder,
    });
  } catch (error) {
    console.error("Error updating return status:", error);
    return res.json({
      success: false,
      message: "Server error: In order Controller",
    });
  }
};


const getAllReturns = async () => {
  try {

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Server error: In order Controller' });
  }
}
const orderReturnDelete = async (req, res) => {
  const { orderId, status, comments } = req.params;
  if (!orderId) {
    return res.json({ success: false, message: 'Order ID not found' });
  }

  try {
    const orderData = await orderModel.findById(orderId);

    if (!orderData) {
      return res.json({ success: false, message: "Order not found" });
    }

    for (let item of orderData.items) {
      await productModel.updateOne(
        { _id: item.productId, "sizes.size": item.size },
        {
          $inc: {
            "sizes.$.stock": item.quantity, 
          },
        }
      );
    }

    orderData.status = status || orderData.status;
    orderData.payment = true;
    orderData.returnOrder = {
      ...orderData.returnOrder,
      comments: comments || orderData.returnOrder?.comments || "",
      status: status || orderData.returnOrder?.status || "completed",
    };

    await orderData.save();

    return res.json({
      success: true,
      message: "Order successfully returned",
      data: orderData,
    });

  } catch (error) {
    console.error("Delete error:", error);
    return res.json({ success: false, message: 'Server error' });
  }
};




export {
  createReturn,
  getAllReturns,
  updateReturnStatus,

  orderReturnDelete
}