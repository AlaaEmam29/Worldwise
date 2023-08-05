import React, { useEffect } from 'react'
import styles from './City.module.css'
import Button from './Button'
import {   useParams } from 'react-router'
import { useAppContext } from '../context/AppContext'
import { useAuthContext } from '../context/AuthContext'
import Loading from './Loading'

export default function City() {
    const {id} = useParams() 
   
    const { state, handleBack, getCurrentCity  , formattedFullDate , flag} = useAppContext()
        const {state :authState} = useAuthContext()

    const { currentCity } = state
    useEffect(() => {
        if (authState.user?.uid && state.cities) {
            getCurrentCity(id)
        }
    }, [id, authState.user?.uid, state.cities])
const flagText = flag(currentCity.emoji)
  return (
      <>
        {
        currentCity ?   <div className={styles.City}>
          <div className={styles.details}>
              <h2>CITY NAME</h2>
                      <h3>
                          <span>
                                       <img src={`https://flagcdn.com/24x18/${flagText}.png`} alt={`flag ${flagText}`} />

                          </span>
                          {currentCity.cityName}</h3>
          </div>
           <div className={styles.details}>
              <h4>YOU WENT TO {currentCity.cityName} ON</h4>
              <p>{formattedFullDate(currentCity.date)}</p>
          </div>
          {currentCity.notes && <div className={styles.details}>
              <h4>YOUR NOTES</h4>
              <p>{currentCity.notes}</p>
          </div>}
          <div className={styles.details}>
              <h4>LEARN MORE
</h4>
                      <a href={`https://en.wikipedia.org/wiki/${currentCity.cityName}`} target="_blank" rel="noreferrer">Check out {currentCity.cityName} on Wikipedia &rarr;</a>
          </div>
                                <Button className='btn btn-back' onClick={(e)=>handleBack(e,-1)}>&larr; Back</Button>

    </div> : <Loading/>
    }
      </>
  )
}
