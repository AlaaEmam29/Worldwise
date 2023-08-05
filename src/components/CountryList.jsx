import React from 'react'
import styles from './Country.module.css'
import { useAppContext } from '../context/AppContext'
import CountryItem from './CountryItem'
export default function CountryList() {
  const { state } = useAppContext()
  const uniqueCountries = new Set();

  const countries =state.cities.reduce((list, city) => {
    if (!uniqueCountries.has(city.country)) {
      uniqueCountries.add(city.country);
          return [...list, { country: city.country, emoji: city.emoji }];

    }
    return list
  }, [])
  return (
    <div className={styles.Countries}>
     
       {countries.length > 0 ? countries.map((data, index) => {
         return <CountryItem key={index} data={ data} />
   }) : <p>No countries found. Click on the map to add places you would like to visit.</p>}
    </div>
  )
}

     
          

