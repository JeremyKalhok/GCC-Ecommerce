import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/logo.png'
import 'boxicons'

const Navbar = () => {
  return (
    <div className="navbar">
        <img src={navlogo} alt="" className="nav-logo" />
        <div className="nav-profile"> {/* needed to wrap box-icon in a div so it could be styled */}
            <box-icon name='user'></box-icon>
        </div>
    </div>
  )
}

export default Navbar