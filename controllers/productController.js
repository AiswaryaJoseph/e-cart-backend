//import product collection
const products = require('../models/productSchema')

// Define logic to resolve client request

// get all products

exports.getAllProducts = async (req, res) => {
    try {
        // get all products from product collection in mongodb
        const allProducts = await products.find()
        res.status(200).json(allProducts)

    }
    catch (error) {
        res.status(401).json(error)
    }
}

//get particular products from an id
exports.viewProduct = async(req,res)=>{
    //get product id from request
    const id=req.params.id

    //logic
    try{
//check if id is present in mongoDb
const product = await products.findOne({id})
if(product){
res.status(200).json(product)
}
else{
    res.status(401).json("Product not found")

}
    }
    catch(error){
res.status(404).json(error)
    }
}