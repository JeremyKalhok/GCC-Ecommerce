import React from 'react'
import './LoginSignup.css'

export const LoginSignup = () => {
  return (
    <div className="login-signup">
      <div className="login-signup-container">
        <h1>Sign Up</h1>
        <div className="login-signup-fields">
          <input type="text" placeholder='Enter your name' />
          <input type="email" placeholder='Enter your email address' />
          <input type="password" placeholder='Enter your password' />
          <button>Continue</button>
          <p className="login-signup-login">Already have an account? <span>Login here</span></p>
        </div>
        <div className="login-signup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use and privacy policy</p>
        </div>
      </div>
    </div>
  )
}
