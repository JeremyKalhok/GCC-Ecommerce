import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import 'boxicons'

const Sidebar = () => {
  return (
    <div className="sidebar">
        <Link to={'/addproduct'} >
            <div className="sidebar-item">
                <box-icon type='solid' name='cart-add'></box-icon>
                <p>Add Product</p>
            </div>
        </Link>
        <Link to={'/listproduct'} >
            <div className="sidebar-item">
                <box-icon name='list-ul'></box-icon>
                <p>Product List</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar