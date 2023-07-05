//import wishlist
const wishlists = require('../models/wishlistSchema')

// logic for add to wishlist
exports.addtowishlist = async(req,res)=>{
    //get product details from request

    // req.body={
    //     id:'3',
    //     title:'hd',
    //     price:3333
    // }

    //destructure req.body
    const{id,title,price,image} = req.body

    //logic
    try{
        const item =await wishlists.findOne({id})
        if(item){
            res.status(404).json("Product already exits")
        }
        else{
            //add item to wishlist collection
            const newItem = new wishlists({id,title,price,image})
            //to store in wishlists collection
            await newItem.save()
            //send response back to client
            res.status(200).json("Product added to wishlist")
        }

    }
    catch(error){
        res.status(404).json(error)
    }
}

//logic to view wish list product details

exports. getWishlist = async(req,res)=>{
//logic to view wish list product details
try{
    const allWishlists = await wishlists.find()
    res.status(200).json(allWishlists)
}

catch(error){
res.status(404).json(error)
}

}

//delete wishlist product details
exports.deleteWishlist= async(req,res) =>{
    //get id from request
    const {id} = req.params
    //logic
    try{
const removeWishlists = await wishlists.deleteOne({id})
if(removeWishlists){
    //get all wishlist products after removing particular details
    const allitems = await wishlists.find()
    res.status(200).json(allitems)

}
    }
    catch(error){
        res.status(404).json(error)
    }
}