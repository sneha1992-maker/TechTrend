// console.log("Mern Electronic Ecommerce API")

import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'express' // after thunder
import userRouter from './Routes/user.js'
import productRouter from './Routes/product.js'
import cartRouter from './Routes/cart.js'
import addressRouter from './Routes/address.js'

import cors from 'cors'

const app = express()
//after thunder error
app.use(bodyParser.json())




app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))





//after routes
//user Router
app.use('/api/user',userRouter)
 // api/user/register

 //product router
 app.use('/api/product',productRouter)

 //cart Router
 app.use('/api/cart',cartRouter)

 //address Router
 app.use('/api/address',addressRouter)



mongoose.connect("mongodb+srv://nayaksneha92:KnG73SCgLZFxVPRL@cluster0.3naniq7.mongodb.net/",{
    dbName:"Mern_Ecommerce"
}
).then(()=>console.log("Mongodb Connected Successfully..!")).catch((err)=>console.log(err));



const port = 1000;
app.listen(port,()=>console.log(`Server is running on port ${port}..!`))



