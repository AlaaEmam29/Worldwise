import React from 'react'
import styles from './City.module.css'
import { useAppContext } from '../context/AppContext'
import { useAuthContext } from '../context/AuthContext'
import CityItem from './CityItem'
import Loading from './Loading'

export default function CityList() {
  const { state } = useAppContext()
  const { state: currentAuth } = useAuthContext()
  return (
    <>
    {state.loading && !currentAuth.user && <Loading/>} 
      <div className={styles.Cities}>
        {!state.loading && currentAuth.user && state.cities?.length > 0 ? state.cities.map((data, index) => {
          
          return <CityItem data={ data} key={index}  />
        }) : <p>{ state.error}</p>}
          
    </div>
    </>
  )
}
