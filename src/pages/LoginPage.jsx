import React from 'react'
import FormAuth from '../components/FormAuth'
import { useAuthContext } from '../context/AuthContext'
import styles from './LoginPage.module.css'

import Button from '../components/Button'
export default function LoginPage() {
  const {handleSubmitLogin , state , handleChangeInput , handleGoogleLoginIn} = useAuthContext()
    const inputs = ["email" , "password"]
  return (
      <div className={styles.loginPage}>
      <div className="authform">
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
          
               <FormAuth inputs={inputs} status='login' onSubmit={handleSubmitLogin} onChange={handleChangeInput}/>
              <hr />
              <p>Login with</p>
   <Button className='btn btn-auth ' onClick={handleGoogleLoginIn} >Google</Button>
         </div>
    </div>
  )
}
