import React from 'react'
import styles from './City.module.css'
import {  Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Button from './Button'

export default function CityItem({  data }) {
  const {cityName , emoji,position : {lat , lng},date , id} = data
  const URL = `${id}?lat=${lat}&lng=${lng}`
  const { state, formattedFullDate , flag , handleDeleteCity } = useAppContext()
      const flagText = flag(emoji)
  return (
   <Link className={state?.currentCity?.id === id? `${styles.CityItem } ${styles.CityItemActive}`:styles.CityItem} to={`${URL}`} >
              <span ><img src={`https://flagcdn.com/24x18/${flagText}.png`} alt={`flag ${flagText}`} /></span>
<h3 >{cityName}</h3>

<time >({formattedFullDate(date)})</time>
<Button className={styles["delete-btn"]} onClick={(e)=>handleDeleteCity(e , id)}>×</Button>
      </Link>
  )
}
