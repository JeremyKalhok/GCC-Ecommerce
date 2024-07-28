import React from 'react'
import { Welcome } from '../Components/Welcome/Welcome'
import { HomeShells } from '../Components/HomeShells/HomeShells'
import { HomeButtons } from '../Components/HomeButtons/HomeButtons'
import { HomeInternals } from '../Components/HomeInternals/HomeInternals'
import { Newsletter } from '../Components/Newsletter/Newsletter'
import './Home.css'

export const Home = () => {     // home page
  return (
    <div>
      <Welcome />
      <HomeShells />
      <hr />
      <HomeButtons />
      <hr />
      <HomeInternals />
      <Newsletter />
    </div>
  )
}
