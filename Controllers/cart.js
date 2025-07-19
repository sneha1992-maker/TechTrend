import { Cart } from "../Models/Cart.js";

//add to cart
// export const addToCart = async(req,res) =>{
//     const {productId,title,price,qty,imgSrc}= req.body
//     const userId = "67fcf818d2f8cac805eee683"; // adds same products many items differently
//     let cart = new Cart({userId,items:[]})
//     cart.items.push({productId,title,price,qty,imgSrc})
//     await cart.save();
//     res.json({message:"Items added to cart",cart})
// }

//add to cart - make changes same above
export const addToCart = async (req, res) => {
  const { productId, title, price, qty, imgSrc } = req.body;
  // const userId = "67fcf818d2f8cac805eee683"; // adds same products many items differently

  //extra
  const userId = req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex >= 0) {
    cart.items[itemIndex].qty += qty;
    cart.items[itemIndex].price += price * qty;
  } else {
    cart.items.push({ productId, title, price, qty, imgSrc });
  }

  await cart.save();
  res.json({ message: "Items added to cart", cart });
};


//get user cart
export const userCart = async (req, res) => {
  // const userId = "67fcf818d2f8cac805eee683";
  const userId = req.user;
  let cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ message: "Cart not found" });
  res.json({ message: "User cart", cart });
};


// remove product from cart
export const removeProductFromCart = async (req, res) => {
  const productId = req.params.productId;
  // const userId = "67fcf818d2f8cac805eee683";
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  
  if (!cart) return res.json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );
  await cart.save();
  res.json({ message: "product removed from the cart" });
};

// clear cart
export const clearCart = async (req, res) => {
  
  //  const userId = "67fcf818d2f8cac805eee683";
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart){
    cart = new Cart({items:[]})
  } else{
    cart.items = [];
  }
  await cart.save();

  res.json({ message: "Cart cleared successfully...!" });
};



//decrease quantity
export const decreaseProductqty = async (req, res) => {
  const { productId,qty } = req.body;
  // const userId = "67f8ffa9ca58b0d941898fcb"; // adds same products many items differently

  const userId = req.user;


  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] }); // if cart not found, make a new cart
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex >= 0) {
    const item = cart.items[itemIndex] // keep specific index - the quantity of which to decrease

    if(item.qty>qty){
      const pricePerUnit = item.price/item.qty

      item.qty -= qty
      item.price -= pricePerUnit*qty
    } else{
      cart.items.splice(itemIndex,1) // if only 1 qty is there
    }

  } else {
    return res.json ({message:'Invalid Product id'})
  }

  await cart.save();
  res.json({ message: "Items Quantity decreased successfully", cart });
};
