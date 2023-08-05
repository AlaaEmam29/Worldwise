import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import Button from './Button'
import styles from './FormAuth.module.css'
export default function FormAuth({ inputs , onSubmit , status , onChange}) {
  const { state } = useAuthContext()
  return (
      <form className={styles.FormAuth} onSubmit={onSubmit}>
          {inputs.map((name , i) => <div key={i} className={styles.input__group}>
            <label htmlFor="name">{name === 'name' ? `Full ${name}` : name}</label>
            <input type={name == 'password' ? "password" : name == 'email' ? "email" : "text"} name={name}  value={state[name]}   onChange={onChange}/>
          </div>)}
      {status === 'register' && <>
      
      <p> Already have account ? &nbsp;  <NavLink to="/login" >Sign in</NavLink></p>
              <Button className='btn btn-green '>Register</Button>
      
      </>
      }
       {status === 'login' && <>
      
      <p> No Account ? &nbsp;  <NavLink to="/register" >Sign up</NavLink></p>
              <Button className='btn btn-green '>Login</Button>
      
      </>
}
      
    </form>
  )
}
