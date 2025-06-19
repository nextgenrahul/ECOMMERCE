# 🛒 E-commerce Website (Cash on Delivery)

This is a simple, responsive e-commerce website that allows users to browse products, add them to their cart, and place orders using **Cash on Delivery (COD)**. It is designed for small to medium businesses who want to start selling products online without integrating payment gateways like Stripe or Razorpay.

## 📌 Features

- User-friendly and mobile-responsive design
- Product listing with images, price, and description
- Add to Cart functionality
- View and update cart items
- Checkout page with customer information form
- **Cash on Delivery** as the default payment option
- Order success and confirmation page
- Admin dashboard to manage products and orders

## 🧱 Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js 
- **Database**: MongoDB
- **Authentication**: Authentication Added
- **Deployment**: Works locally and Deploy on Vercel

## 🚚 How Cash on Delivery Works

1. User browses products and adds items to cart.
2. On checkout, user enters name, address, and contact number.
3. Order is submitted with "Cash on Delivery" selected.
4. Order is saved in the database with `status = 'Pending'`.
5. Admin processes the order manually and marks it `Delivered` when payment is received.

## 🧾 Project Structure

