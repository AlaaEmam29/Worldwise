import React, { useEffect } from 'react'
import styles from './City.module.css'
import Button from './Button'
import {   useParams } from 'react-router'
import { useAppContext } from '../context/AppContext'
import { useAuthContext } from '../context/AuthContext'
import Loading from './Loading'
import Flag from './Flag'

export default function City() {
    const {id} = useParams() 
   
    const { state, handleBack, getCurrentCity  , formattedFullDate } = useAppContext()
        const {state :authState } = useAuthContext()

    const { currentCity } = state
    useEffect(() => {
        if (authState?.uid && state.cities) {
            getCurrentCity(id)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, authState?.uid, state.cities ])
  return (
      <>
        {
        currentCity ?   <div className={styles.City}>
          <div className={styles.details}>
              <h2>CITY NAME</h2>
                      <h3>
                    <Flag flagInfo={currentCity.emoji} />       
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
                                <Button type='back' onClick={(e)=>handleBack(e,-1)}>&larr; Back</Button>

    </div> : <Loading/>
    }
      </>
  )
}
