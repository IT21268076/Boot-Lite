const express = require('express');
const router = express.Router();
const { Boot } = require('../Models/Boot');
const {CartItem} = require('../Models/cartItem');

//Admin
// Create a new football boot (Admin)
router.post("/api/football-boots", async (req, res) => {
  const footballBoot = new Boot(req.body);
  await footballBoot.save();
  res.send(footballBoot);
});

// Update a football boot (Admin)
router.put("/api/football-boots/:id", async (req, res) => {
  const footballBoot = await Boot.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(footballBoot);
});

// Delete a football boot (Admin)
router.delete("/api/football-boots/:id", async (req, res) => {
  await Boot.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

//User
// Get all football boots
router.get("/api/footballboots", async (req, res) => {
  const footballBoots = await Boot.find();
  res.send(footballBoots);
});

// Add a football boot to the cart
router.post("/api/cart/add", async (req, res) => {
  try {
    const { footballBootId, quantity} = req.body; 
    console.log("Received footballBootId:", footballBootId);

    const cartItem = new CartItem({ 
      footballBootId,
      quantity,
    });
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});

// Get cart items 
router.get("/api/cart-items", async (req, res) => {
  try {

    const cartItems = await CartItem.find({}).populate({
      path: 'footballBootId',
      model: 'Boot'
    });
    console.log(cartItems)

    const cartItemsWithBootDetails = cartItems.map(item => ({
      _id: item._id,
      brand: item.footballBootId.brand,
      model: item.footballBootId.model,
      price: item.footballBootId.price,
      quantity: item.quantity
    }));

    res.json(cartItemsWithBootDetails);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Update cart item quantity
router.put("/api/cart/update-quantity", async (req, res) => {
  try {
    const { footballBootId, quantity } = req.body;
    
    console.log(footballBootId, quantity);

    const updatedCartItem = await CartItem.findOneAndUpdate(
      { _id: footballBootId },
      { quantity: quantity },
      { new: true } 
    );
    
    if (!updatedCartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    
    res.json(updatedCartItem);
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Remove item from the cart
router.delete("/api/cart/remove", async (req, res) => {
  try {
    const { cartItemId } = req.body;

    console.log("cart item" , cartItemId)

   
    const result = await CartItem.findOneAndDelete({ _id: cartItemId });
    console.log(CartItem)

    if (!result) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;