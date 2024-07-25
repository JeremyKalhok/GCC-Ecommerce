import React from 'react'
import './CartItems.css'
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png'
import { Link } from 'react-router-dom';

export const CartItems = () => {

  const {all_product, cartItems, addToCart, removeFromCart, cancelFromCart, getTotalCartAmount} = useContext(ShopContext);
  
  return (
    <div className="cart-items">
      <div className="side-scroll"> {/* allows the whole cart display to be scrolled at the same time */}
        <div className="cart-items-format-main">
        <p className="product-icon">Products</p>
        <p className="title">Title</p>
        <p className="misc">Price</p>
        <p className="misc">Quantity</p>
        <p className="misc">Total</p>
        <p className="change-quantity-heading">Add</p>
        <p className="change-quantity-heading">Remove</p>
        <p className="change-quantity-heading">Cancel</p>
        </div>
        <hr />
        {all_product.map((e) => {
          if(cartItems[e.id] > 0){ {/* only display a product if it's cart quantity is greater than 0 (if it has been added to the cart) */}
            return  <div className="cart-items-format"> {/* display product information underneath the headings listed in <p></p> tags above */}
                      <Link to={`/product/${e.id}`}><img src={e.image} alt="" className="product-icon" /></Link>  {/* let the image and title link */}
                      <Link to={`/product/${e.id}`} className="title"><p>{e.name}</p></Link>                      {/* to the product's specific page */}
                      <p className="misc">${e.price}</p>
                      <p className="misc">{cartItems[e.id]}</p>
                      <p className="misc">${e.price * cartItems[e.id]}</p>
                      <button onClick={() => addToCart(e.id)} className="change-quantity" >+</button> {/* on click, add another of this item to the cart */}
                      <button onClick={() => removeFromCart(e.id)} className="change-quantity" >-</button> {/* on click, remove one of this item from the cart */}
                      <button onClick={() => cancelFromCart(e.id)} className="change-quantity">x</button> {/* on click, remove all of this item from the cart */}
                    </div>
          }
          return null;
          })}
      </div>
      <div className="cart-items-bottom">
        <div className="cart-items-total">
          <p>Subtotal</p>
          <p>${(getTotalCartAmount()).toFixed(2)}</p>
        </div>
        <hr />
        <div className="cart-items-total">
          <p>Sales Tax (13%)</p>
          <p>${(getTotalCartAmount() * 0.13).toFixed(2)}</p>
        </div>
        <hr />
        <div className="cart-items-total">
          <h3>Total</h3>
          <h3>${(getTotalCartAmount() * 1.13).toFixed(2)}</h3>
        </div>
        <button>PROCEED TO CHECKOUT</button>
      </div>
    </div>
  )
}
