import React from 'react'
import { Welcome } from '../Components/Welcome/Welcome'
import { Home_Shells } from '../Components/Home_Shells/Home_Shells'
import { Home_Buttons } from '../Components/Home_Buttons/Home_Buttons'
import { Home_Internals } from '../Components/Home_Internals/Home_Internals'
import { Newsletter } from '../Components/Newsletter/Newsletter'
import './Home.css'

export const Home = () => {     // home page
  return (
    <div>
      <Welcome />
      <Home_Shells />
      <hr />
      <Home_Buttons />
      <hr />
      <Home_Internals />
      <Newsletter />
    </div>
  )
}
