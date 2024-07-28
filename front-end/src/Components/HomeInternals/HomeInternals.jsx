import React from 'react'
import './HomeInternals.css'
import { Item } from '../Item/Item'
import home_internals from '../Assets/home_internals'
import arrow_icon from '../Assets/arrow.png'
import { Link } from 'react-router-dom'

export const HomeInternals = () => {
  return (
    <div className="home-internals">
        <div className="home-internals-left">
            {home_internals.map((item,index)=>{
                return <Item key={index} id={item.id} name={item.name} image={item.image} price={item.price}/>
            })}
        </div>
        <div className="home-internals-right">
            <h1>INTERNALS</h1>
            <hr />
            <Link to='/internals'>
            <div className="home-internals-btn">
                <p>See more</p>
                <img src={arrow_icon} alt="" />
            </div>
            </Link>
        </div>
    </div>
  )
}
