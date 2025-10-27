import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // FIX: Defensive function to handle both numbers and old string costs.
  const getCostAsNumber = (cost) => {
    if (typeof cost === 'string') {
        // Strip non-numeric characters (like '$') and parse it as a float.
        return parseFloat(cost.replace(/[^0-9.]/g, '')) || 0; 
    }
    // If it's already a number, return it.
    return cost;
  };

  // Total amount for all items
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      // Use the defensive cost function
      const itemCost = getCostAsNumber(item.cost);
      total += itemCost * item.quantity;
    });
    return total.toFixed(2);
  };

  // Subtotal for each item
  const calculateTotalCost = (item) => {
    // Use the defensive cost function
    const itemCost = getCostAsNumber(item.cost);
    return (itemCost * item.quantity).toFixed(2);
  };

  // Increment quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement quantity or remove if zero
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  const isCartEmpty = cart.length === 0;

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${calculateTotalAmount()}</h2> 

      {isCartEmpty ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        cart.map((item) => {
          const displayCost = getCostAsNumber(item.cost); 
          
          return (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                
                {/* Ensure toFixed is called on a number */}
                <div className="cart-item-cost">${displayCost.toFixed(2)}</div> 

                <div className="cart-item-quantity">
                  <button 
                      className="cart-item-button" 
                      onClick={() => handleDecrement(item)}
                      style={{ backgroundColor: item.quantity === 1 ? '#ffdddd' : '#f0f0f0' }}
                  >
                      -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button" onClick={() => handleIncrement(item)}>+</button>
                </div>

                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          )
        })
      )}

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>
          Continue Shopping
        </button>
        
        {/* FIX: Only show Checkout button if the cart is NOT empty */}
        {!isCartEmpty && (
          <>
            <br />
            <button 
                className="get-started-button1" 
                onClick={() => alert('Checkout functionality coming soon')}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartItem;