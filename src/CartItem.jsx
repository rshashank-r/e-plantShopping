import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // FIX 1: Cost is now treated as a number, removing string parsing logic
  // Total amount for all items
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      // Use item.cost directly as a number
      total += item.cost * item.quantity;
    });
    return total.toFixed(2);
  };

  // FIX 1: Cost is now treated as a number, removing string parsing logic
  // Subtotal for each item
  const calculateTotalCost = (item) => {
    // Use item.cost directly as a number
    return (item.cost * item.quantity).toFixed(2);
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
      // Dispatch removeItem when quantity reaches 1 and decrement is clicked
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
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>

      {isCartEmpty ? (
        <p style={{ color: 'black' }}>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              {/* Note: item.cost is now a number, display with $ sign */}
              <div className="cart-item-cost">${item.cost.toFixed(2)}</div> 

              <div className="cart-item-quantity">
                {/* Visual UX improvement: button is disabled/styled if quantity is 1 */}
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
        ))
      )}

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>
          Continue Shopping
        </button>
        
        {/* FIX 2: Only show Checkout button if the cart is NOT empty */}
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