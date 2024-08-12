import React, { useContext, useEffect } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { useParams, Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

export const ProductDisplay = (props) => {

    const {product} = props;
    const {addToCart} = useContext(ShopContext);
    let {productID} = useParams(); // retrieves product id from path name
    let rangeMin = product.category==="shells" ? 1 : product.category==="buttons" ? 11 : product.category==="internals" ? 21 : null;
    let rangeMax = product.category==="shells" ? 10 : product.category==="buttons" ? 20 : product.category==="internals" ? 25: null;
    /* rangeMin and rangeMax are used to set the range of products that can be viewed using the arrow buttons
    based on the product category e.g. can only cycle between products 1-10 if the category is shells */

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

  return (
    <div className="product-display">
        <div className="arrow left"> {/* will allow you to view the product to the left within the given range */}
            <Link to={`/product/${productID > rangeMin ? productID - 1 : rangeMin}`}><p>&lt;</p></Link>
        </div>
        <div className="product-display-left-right-container">
            <div className="product-display-left">
                <img src={product.image} alt="" />
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
                <div className="product-display-right-price">
                    ${product.price}
                </div>
                <div className="product-display-right-description">
                    {product.description}
                </div>
                <div className="add-to-cart-btn">
                    <button onClick={() => {addToCart(product.id); alert(`"${product.name}" has been added to cart!`)}}>ADD TO CART</button>
                </div>
            </div>
        </div>
        <div className="arrow right"> {/* will allow you to view the product to the right within the given range */}
            <Link to={`/product/${productID < rangeMax ? Number(productID) + 1 : rangeMax}`}><p>&gt;</p></Link>
        </div>
    </div>
  )
}
