import React, { useState } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import trigger_plugs_tall from "../Assets/trigger_plugs_tall.png"
import { useParams, Link } from 'react-router-dom'

export const ProductDisplay = (props) => {

    const [size, setSize] = useState('short'); // state used to tell if the short or tall size is selected 
    const {product} = props;
    let {productID} = useParams(); // retrieves product id from path name 
    let rangeMin = product.category==="shells" ? 1 : product.category==="buttons" ? 11 : product.category==="internals" ? 21 : null;
    let rangeMax = product.category==="shells" ? 10 : product.category==="buttons" ? 20 : product.category==="internals" ? 24: null;
    /* rangeMin and rangeMax are used to set the range of products that can be viewed using the arrow buttons
    based on the product category e.g. can only cycle between products 1-10 if the category is shells */

  return (
    <div className="product-display">
        <Link to={`/product/${productID > rangeMin ? productID - 1 : rangeMin}`}><div className="arrow"> {/* will allow you to view the product to the left within the given range */}
            <p>&lt;</p>
        </div></Link>
        <div className="product-display-left"> {/* displays the short or tall image depending on the "size" state value */}
            {productID == 22 ? size === 'tall' ? <img src={trigger_plugs_tall} alt="" /> : <img src={product.image} alt="" /> : <img src={product.image} alt="" />} {/* but only displays tall image if still on the trigger plugs page */}
        </div>
        <div className="product-display-right">
            <h1>{product.name}</h1>
            <div className="product-display-right-stars">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="product-display-right-prices">
                ${product.price}
            </div>
            <div className="product-display-right-description">
                {product.description}
            </div>
            <div className="product-display-right-size" style={{display: Number(productID) === 22 ? 'block' : 'none'}}> {/* THIS SHOULD ONLY DISPLAY FOR TRIGGER PLUGS */}
                <h1>Select Size</h1> {/* if the product ID is 22 (trigger plugs), display the size selector, otherwise keep it hidden */}
                <div className="product-display-right-sizes" style={{display: Number(productID) === 22 ? 'flex' : 'none'}}>
                    <button onClick={() => setSize('short')}>Short</button> {/* selecting an option will change the state */}
                    <button onClick={() => setSize('tall')}>Tall</button>   {/* which will change the displayed image */}
                </div>
            </div>
            <div className="add-to-cart-btn">
                <button>ADD TO CART</button>
            </div>
        </div>
        <Link to={`/product/${productID < rangeMax ? Number(productID) + 1 : rangeMax}`}><div className="arrow"> {/* will allow you to view the product to the right within the given range */}
            <p>&gt;</p>
        </div></Link>
    </div>
  )
}
