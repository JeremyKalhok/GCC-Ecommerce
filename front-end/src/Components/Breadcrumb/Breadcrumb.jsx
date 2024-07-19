import React from 'react'
import './Breadcrumb.css'
import breadcrumb_arrow_icon from '../Assets/breadcrumb_arrow.png'

export const Breadcrumb = (props) => { /* breadcrumbs are used to reveal user location, and can help navigation through pages in a hierarchical layout */

  const {product} = props; /* the product object passed in as a prop will be stored in this variable */
    
  return (
    <div className="breadcrumb"> {/* display the specific breadcrumb based on the product's path */}
        HOME <img src={breadcrumb_arrow_icon} alt="" /> {product.category} <img src={breadcrumb_arrow_icon} alt="" /> {product.name}
    </div>
  )
}
