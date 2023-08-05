import React, { useEffect, useState } from 'react'
import styles from './AppForm.module.css'
import { useAppContext } from '../context/AppContext'
import Button from './Button'
import Loading from './Loading'
import { URL } from '../services/constant'
import { useUrlPosition } from '../hooks/useUrlPosition'
import axios from 'axios'

export default function AppFrom() {
    const { state , handleBack , handleChangeInputMapForm ,handleAddNewCities , handleChangeInputMapFormWhenClick , flag} = useAppContext()
      const [errorCoordinates, setErrorCoordinates] = useState("") 
    const [lat , lng ] = useUrlPosition()
    const fetchData = async (lat , lng) => {
        try {
            const {data} = await axios.get(URL, {
                params: {
                    latitude:lat,
                    longitude: lng,
                },
            });
            if (data) {
                const { city, countryName, countryCode, locality } = data
                
                handleChangeInputMapFormWhenClick("cityName", city ? city : locality)
        handleChangeInputMapFormWhenClick("emoji", countryCode)
        handleChangeInputMapFormWhenClick("country", countryName)

       
        setErrorCoordinates('')

      }
    }
    catch (error) {
      setErrorCoordinates(error.response?.data?.description)
    }
  } 

    useEffect(() => {
        if(!lat && !lng) return
        fetchData(lat , lng)
        
    }, [lat, lng])
    if (!lat && !lng) {
        return      <p style={{ margin : "5rem auto"}}>Start by clicking somewhere on the map</p>

        
    }

    const flagText = flag(state.emoji)
    return (
        <>
            {state.loading && !state.error && <Loading />}

                {errorCoordinates &&<p style={{color:"red" , margin : "4rem auto"}}>{errorCoordinates}</p>}

            {
                 !state.loading &&   <div className={styles.AppFrom}>
                    <form onSubmit={handleAddNewCities}>
              <label htmlFor="cityName">City name</label>
                        <div className={styles.AppFromFlag}>
              <input type="text" name="cityName" id="cityName"  value={state.cityName } onChange={handleChangeInputMapForm} maxLength={50}/>
                <span><img src={`https://flagcdn.com/24x18/${flagText}.png`} alt={`flag ${flagText}`} /></span>
                        </div>
                                           <label htmlFor="date">When did you go to {state.cityName}?</label>
                        <input type="datetime-local" name="date" id="date" value={state.date} onChange={handleChangeInputMapForm} />
                        

                        <label htmlFor="notes">Notes about your trip to {state.cityName}</label>
              <textarea htmlFor="id" name="notes" cols="30" rows="5" value={state.notes} onChange={handleChangeInputMapForm}></textarea>
              <div className={styles.btns}>
                  <Button className='btn btn-green'>ADD</Button>
                  <Button className='btn btn-back' onClick={(e)=>handleBack(e,"/app")}>&larr; Back</Button>
              </div>
          </form>
    </div>
    }
        </>
  )
}
