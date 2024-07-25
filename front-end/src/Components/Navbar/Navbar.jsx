import React, { useContext, useRef } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import dropdown_icon from '../Assets/dropdown_icon_2.png'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

export const Navbar = () => {

    let location = useLocation();
    const {getTotalProducts} = useContext(ShopContext);
    const menuRef = useRef();
    const dropdown_toggle = (e) => { // clicking the dropdown icon image will toggle giving the className "nave-menu-visible"
        menuRef.current.classList.toggle('nav-menu-visible'); // to the list and the className "open" to the dropdown icon
        e.target.classList.toggle('open');
    }

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <Link to='/'><img src={logo} alt="" /></Link>       {/* clicking the logo or the text will set the path to home */}
            <Link to='/'><p>GCC 4 U</p></Link>
        </div>
        <img onClick={dropdown_toggle} src={dropdown_icon} className="nav-dropdown" alt="" />
        <ul ref={menuRef} className="nav-menu">       {/* creates an unordered list. Upon clicking a list item, (e.g. Buttons), the path */}
            <Link to='/shells'><li>Shells{location.pathname==='/shells'?<hr />:<></>}</li></Link>       {/* will be changed to '/buttons'. Using the ternary operator. The horizontal*/} 
            <Link to='/buttons'><li>Buttons{location.pathname==='/buttons'?<hr />:<></>}</li></Link>       {/* line and its properties will only display if the path is of that page, */}
            <Link to='/internals'><li>Internals{location.pathname==='/internals'?<hr />:<></>}</li></Link>    {/* letting this work with the "See more" buttons on the home page */}
        </ul>   {/* the Link tag sets the path depending on which page you click, for the App.js Router component to decide which page to render */}
        <div className="nav-login-cart">    {/* container for login button and cart */}
            <Link to='/login'><button>Login</button></Link>
            <Link to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalProducts()}</div>     {/* circle counter for cart items */}
        </div>
    </div>
  )
}
