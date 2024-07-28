import React from 'react'
import './HomeShells.css'
import { Item } from '../Item/Item'
import home_shells from '../Assets/home_shells'
import arrow_icon from '../Assets/arrow.png'
import { Link } from 'react-router-dom'

export const HomeShells = () => {
  return (
    <div className="home-shells">
        <h1>SHELLS</h1>
        <hr />
        <Link to='/shells'>
        <div className="home-shells-btn">
          <p>See more</p>
          <img src={arrow_icon} alt="" />
        </div>
        </Link>
        <div className="home-shells-item">
            {home_shells.map((item,index)=>{   /* print out the home_shells images and their information, and map them to an index i so react can differentiate them */
                return <Item key={index} id={item.id} name={item.name} image={item.image} price={item.price}/>
            })}
        </div>
    </div>
  )
}
