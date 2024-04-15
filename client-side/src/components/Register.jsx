import React from 'react'
import "./CSS/Register.css"
import register from "../assets/login.jpg"

function Register() {
  return (
    <>
    <section className='in-parent'>
      <section id='register'>
        <div><img src={register} alt="register" /></div>
        <div>
          <h2>Create an Account</h2>
        </div>
      </section>
    </section>
    </>
  )
}

export default Register