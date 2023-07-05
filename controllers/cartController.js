//import cart collection
const carts = require('../models/cartSchema')

//add to cart
exports.addToCart = async (req, res) => {
    //get product details from the request

    //destructure
    const { id, title, price, image, quantity, grandTotal } = req.body

    //logic 

    try {
        //check if the product is already in carts collection
        const product = await carts.findOne({ id })
        if (product) {
            //product is in the cart collection, so increment quantity
            product.quantity += 1
            //update product grand total
            product.grandTotal = product.price * product.quantity
            //to update product details in mongo db
            product.save()
            //to send response back to client
            res.status(200).json("Product added successfully")
        }
        else {
            // product is not in cart collection
            const newProduct = new carts({ id, title, price, image, quantity, grandTotal: price })
            //save new product in cart
            await newProduct.save()
            //to send response back to client
            res.status(200).json("Product added successfully")
        }
    }
    catch (error) {
        res.status(404).json(error)
    }
}

//get cart
exports.getCart = async (req, res) => {
    //get all products from cart
    try {
        //logic
        const allcarts = await carts.find()
        res.status(200).json(allcarts)

    } catch (error) {
        res.status(404).json(error)
    }
}

//remove items from cart
exports.removeCartItem = async (req, res) => {
    //get id from the request
    const {id} = req.params
    // product removed from the cart collection
    try {
        //logic -
        const removecart = await carts.deleteOne({id})
        if (removecart.deleteCount!=0) {
            //to display remaining items in the cart
            const allcarts = await carts.find()
            res.status(200).json(allcarts)
        } else {
            res.status(401).json('Item not found')
        }
    }
    catch (error) {
        res.status(404).json(error)
    }
}

//increment cart items
exports.incrementCart= async(req,res)=>{
    //get product id from the request
    const {id} = req.params //destructure
    try{
        //logic
        //check th eproduct in the cart collection, if it exists then increment the quantity
        const product = await carts.findOne({id})
        //if it exists then increment the quantity
        if(product){
            //update product quantity and grandtotal (price)
            product.quantity+=1
            product.grandTotal=product.price * product.quantity
            //save changes in mongoDB
            await product.save()
            //increment the quantity. get all cart collection item and updating in particular item count
            const allcarts = await carts.find()
            res.status(200).json(allcarts)
        }
        else {
            res.status(401).json('Item not found')
        }

    }
    catch(error){
        res.status(401).json(error)
    }
}


//dercrement cart items
exports.decrementCart=async(req,res)=>{
    //get product id from the request
    const {id} = req.params //destructure
    try{
        //logic
        //check th eproduct in the cart collection, if it exists then increment the quantity
        const product = await carts.findOne({id})
        if(product.quantity==0){
            const removecart = await carts.deleteOne({id})
                //to display remaining items in the cart
                const allcarts = await carts.find()
                res.status(200).json(allcarts)
            
        }
        else{
            if(product){
                //update product quantity and grandtotal (price)
                product.quantity-=1
                product.grandTotal=product.price * product.quantity
                //save changes in mongoDB
                await product.save()
                //increment the quantity. get all cart collection item and updating in particular item count
                const allcarts = await carts.find()
                res.status(200).json(allcarts)
            }
            else {
                res.status(401).json('Item not found')
            }
        }
        //if it exists then increment the quantity
        

    }
    catch(error){
        res.status(401).json(error)
    }
}