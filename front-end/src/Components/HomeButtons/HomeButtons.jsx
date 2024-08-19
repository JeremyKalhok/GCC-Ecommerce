import React, { useEffect, useState } from 'react'
import './HomeButtons.css'
import { Item } from '../Item/Item'
import arrow_icon from '../Assets/arrow.png'
import { Link } from 'react-router-dom'

export const HomeButtons = () => {

  const [home_buttons, setHome_Buttons] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/homebuttons`).then((response) => response.json())
    .then((data) => setHome_Buttons(data));
  }, []);

  let home_buttons1 = home_buttons.slice(0, 2);
  let home_buttons2 = home_buttons.slice(2);

  return (
    <div className="home-buttons">
        <div className="home-buttons-left">
          <h1>BUTTONS</h1>
          <hr />
          <Link to='/buttons'>
          <div className="home-buttons-btn">
            <p>See more</p>
            <img src={arrow_icon} alt="" />
          </div>
          </Link>
        </div>
        <div className="home-buttons-middle">
          {home_buttons1.map((item,index)=>{
            return <Item key={index} id={item.id} name={item.name} image={item.image} price={item.price}/>
          })}
        </div>
        <div className="home-buttons-right">
          {home_buttons2.map((item,index)=>{
            return <Item key={index} id={item.id} name={item.name} image={item.image} price={item.price}/>
          })}
        </div>
    </div>
  )
}
