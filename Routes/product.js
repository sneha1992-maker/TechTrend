import express from 'express'

import { addProduct,getProducts,getProductById,updateProductById,deleteProductById } from '../Controllers/product.js';

const router = express.Router();

//add product
router.post('/add',addProduct)


//get product
router.get('/all',getProducts)


//get product by id
router.get("/:id",getProductById) // id -> same as controllers 

//update product by id
router.put('/:id',updateProductById)

//delete product by id
router.delete("/:id",deleteProductById)

export default router