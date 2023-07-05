//Inside router.js file import express
const express = require('express')

//import product controller
const productController = require('../controllers/productController')

//import wishlist controller
const wishlistController = require('../controllers/wishlistController')

//import cart controller
const cartController = require('../controllers/cartController')

//using express create an object for router class inorder to setup path

const router = new express.Router()

//resolve client request in various server routes

//all api call will be resolved here

// get all products
router.get('/products/all-products',productController.getAllProducts)

//get particular product details
router.get('/products/viewproduct/:id',productController.viewProduct)

//add to wishlist 
router.post('/products/addtowishlist',wishlistController.addtowishlist)

//get wishlist product details
router.get('/products/getwishlist',wishlistController.getWishlist)

//delete item from wishlist
router.delete('/products/deletewishlist/:id',wishlistController.deleteWishlist)

//add to cart
router.post('/products/addtocart',cartController.addToCart)

//getcart
router.get('/products/getcart',cartController.getCart)

//remove item from cart
router.delete('/products/deletecart/:id',cartController.removeCartItem)

//cart increment
router.get('/products/increment/:id',cartController.incrementCart)

//cart decrement
router.get('/products/decrement/:id',cartController.decrementCart)

// export
module.exports= router

