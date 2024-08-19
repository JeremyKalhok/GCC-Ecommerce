import React, { useEffect, useState } from 'react'
import './HomeInternals.css'
import { Item } from '../Item/Item'
import arrow_icon from '../Assets/arrow.png'
import { Link } from 'react-router-dom'

export const HomeInternals = () => {

    const [home_internals, setHome_Internals] = useState([]);
    useEffect(() => {
        fetch('https://gcc-ecommerce-backend.onrender.com/homeinternals', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': 'https://gcc-ecommerce-backend.onrender.com',
                Accept: 'application/json',
            },
        }).then((response) => response.json())
        .then((data) => setHome_Internals(data));
    }, []);

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
