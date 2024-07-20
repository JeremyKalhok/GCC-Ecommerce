import React from 'react'
import './CartItems.css'
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png'

export const CartItems = () => {

  const {all_product, cartItems, removeFromCart} = useContext(ShopContext);
  
  return (
    <div className="cart-items">
      <div className="cart-items-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if(cartItems[e.id] > 0){ {/* only display a product if it's cart quantity is greater than 0 (if it has been added to the cart) */}
          return  <div className="cart-items-format"> {/* display product information underneath the headings listed in <p></p> tags above */}
                    <img src={e.image} alt="" className="product-icon" />
                    <p>{e.name}</p>
                    <p>${e.price}</p>
                    <button className="cart-items-quantity">{cartItems[e.id]}</button>
                    <p>${e.price * cartItems[e.id]}</p>
                    <img src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" />
                  </div>
        }
      })}
    </div>
  )
}
