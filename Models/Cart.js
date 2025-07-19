import mongoose from 'mongoose'


const cartItemSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId, //have to store user product id
        ref:"Product",
        required:true
    },
    title:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    qty:{
        type:Number,
        require:true,
    },
    imgSrc:{
        type:String,
        require:true,
    },

})

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, //have to store user id
        ref:"User",
        required:true
    },
    items:[cartItemSchema] //multiple products
})

export const Cart = mongoose.model('Cart',cartSchema)