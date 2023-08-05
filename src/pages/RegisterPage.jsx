import React from 'react'
import FormAuth from '../components/FormAuth'
import { useAuthContext } from '../context/AuthContext'
import styles from './RegisterPage.module.css'
export default function RegisterPage() {
  const inputs = ['name', 'email', 'password']
  const { handleSubmitRegister, state  , handleChangeInput } = useAuthContext()
  return (
    <div className={styles.registerPage}>
      <div className={`authform ${styles.authform}`}>
        {state.error &&
        Object.keys(state.error).map((key , index) => 
        {
           return <p key={index}>
            <strong style={{ color: 'red' }}>{key}</strong> : {state.error[key]}
          </p>
        }
          )}
        
          {state.errorFirebase && <p>
            <strong style={{ color: 'red' }}>{state.errorFirebase}</strong> 
          </p>
        }
        <FormAuth inputs={inputs} onSubmit={handleSubmitRegister} status={"register"} onChange={handleChangeInput}/>
         </div>
    </div>
  )
}
