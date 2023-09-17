import React, { useState, useEffect } from "react";
import axios from "axios";
import "../shoppingCart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/cart-items").then((response) => {
      setCartItems(response.data);
      console.log(response.data);
    });
  }, []);

  const handleUpdateCartQuantity = (footballBoot, quantity) => {
    console.log("Updating quantity:", footballBoot, quantity);

    // Make the update request to the server
    axios
      .put("http://localhost:4000/api/cart/update-quantity", {
        footballBootId: footballBoot._id,
        quantity: quantity,
      })
      .then((response) => {
        // Update the cartItems state with the updated data from the response
        const updatedCartItems = cartItems.map((item) =>
          item._id === footballBoot._id ? { ...item, quantity: response.data.quantity } : item
        );
        setCartItems(updatedCartItems);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error updating quantity:", error);
      });
  };

  const handleRemoveFromCart = (cartItem) => {
    axios
      .delete("http://localhost:4000/api/cart/remove", {
        data: { cartItemId: cartItem._id },
      })
      .then((response) => {
        if (response.status === 204) {
          // If the deletion is successful, remove the item from cartItems
          setCartItems((prevCartItems) =>
            prevCartItems.filter((item) => item._id !== cartItem._id)
          );
        }
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
      });
  };  

  return (
    <div>
      <h3 className="cartheading">Your Cart</h3>

      <div className="cartWrapper_cart">
        {cartItems.map((cartItem) => (
          <div className="cartCard" key={cartItem._id}>
            {cartItem.brand} {cartItem.model} - ${cartItem.price} x {cartItem.quantity}
            <input
              type="number"
              value={cartItem.quantity}
              onChange={(e) => handleUpdateCartQuantity(cartItem, e.target.value)}
            />
            <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
          </div>
        ))}

        
        <p id="total">
          Total: $
          {cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)}
        </p>
      </div>
    </div>
  );
};

export default Cart;
