import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import Styles from './User.module.css'
import Button from './Button'
import { useAppContext } from '../context/AppContext'

export default function User() {
  const { state } = useAuthContext()
  const {handleLogOut} = useAppContext()
  return (
     <div className={Styles.User}>
      {state.user ? <>
      <img src={state.user?.photoURL ? state.user?.photoURL : "https://emedia1.nhs.wales/HEIW2/cache/file/F4C33EF0-69EE-4445-94018B01ADCF6FD4_medium.png" } alt="" />
          <p>Welcome , {state.user?.displayName }</p>
<Button type='green' onClick={handleLogOut}>LogOut</Button></> : <p>Loading</p>}
      </div>
  )
}
