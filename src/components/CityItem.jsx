import React from 'react'
import styles from './City.module.css'
import {  Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Flag from './Flag'
import DeleteBtn from './DeleteBtn'

export default function CityItem({  data }) {
  const {cityName , emoji,position : {lat , lng},date , id} = data
  const URL = `${id}?lat=${lat}&lng=${lng}`
  const { state, formattedFullDate  , handleDeleteCity } = useAppContext()
  return (
   <Link className={state?.currentCity?.id === id? `${styles.CityItem } ${styles.CityItemActive}`:styles.CityItem} to={`${URL}`} >
      <Flag flagInfo={emoji} />
<h3 >{cityName}</h3>

<time >({formattedFullDate(date)})</time>
<DeleteBtn className={styles["delete-btn"]} onClick={(e)=>handleDeleteCity(e , id)}>×</DeleteBtn>
      </Link>
  )
}
