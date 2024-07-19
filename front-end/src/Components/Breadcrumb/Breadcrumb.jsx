import React from 'react'
import './Breadcrumb.css'
import breadcrumb_arrow_icon from '../Assets/breadcrumb_arrow.png'
import { Link } from 'react-router-dom'

export const Breadcrumb = (props) => { /* breadcrumbs are used to reveal user location, and can help navigation through pages in a hierarchical layout */

  const {product} = props; /* the product object passed in as a prop will be stored in this variable */
    
  return (
    <div className="breadcrumb"> {/* display the specific breadcrumb based on the product's path */}
        <Link to={'/'}>Home</Link> <img src={breadcrumb_arrow_icon} alt="" /> <Link to={`/${product.category}`}>{product.category}</Link> <img src={breadcrumb_arrow_icon} alt="" /> <Link to={`/product/${product.id}`}>{product.name}</Link>
    </div>
  )
}
