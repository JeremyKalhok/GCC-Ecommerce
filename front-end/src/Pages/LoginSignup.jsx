import React, { useState } from 'react'
import './LoginSignup.css'

export const LoginSignup = () => {

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({ // initialize an empty input form
    name: "",
    email: "",
    password: "",
  });
  const [checked, setChecked] = useState(false);

  const continueButton = () => {
    if (state==="Sign Up" && !document.getElementById('checkbox').checked){
      alert("Please agree to the terms of use and privacy policy");
    }
    else{
      state==="Login"?login():signup();
    }
  };

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});
  }; // update the value of each field in formData based on the name of the input

  const login = async () => {
    console.log("Login Function Executed", formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);
    if (responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/GCC-Ecommerce");
    }
    else{
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    console.log("Signup Function Executed", formData);
    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);
    if (responseData.success){ // if signup is successful, (success is true), store the jwt auth token
      localStorage.setItem('auth-token', responseData.token); // and send the user to the homepage
      window.location.replace("/GCC-Ecommerce");
    }
    else{
      alert(responseData.errors);
    }
  };

  return (
    <div className="login-signup">
      <div className="login-signup-container">
        <h1>{state}</h1>
        <div className="login-signup-fields">
          {state==="Sign Up"?<input name='name' value={formData.name} onChange={changeHandler} type="text" placeholder='Enter your name' />:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Enter your email address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Enter your password' />
          <button onClick={() => {continueButton()}}>Continue</button>
          {state==="Sign Up"
          ?<p className="login-signup-login">Already have an account? <span onClick={() => {setState("Login")}}>Login here</span></p>
          :<p className="login-signup-login">Don't have an account? <span onClick={() => {setState("Sign Up")}}>Sign Up here</span></p>}
        </div>
        {state==="Sign Up"
        ?<div className="login-signup-agree">
          <input type="checkbox" checked={checked} onClick={() => {checked===true?setChecked(false):setChecked(true);}} name='' id='checkbox' />
          <p>By continuing, I agree to the terms of use and privacy policy</p>
        </div>
        :<></>} {/* only display the privacy policy agreement statement if on the Sign Up page */}
      </div>
    </div>
  )
}
