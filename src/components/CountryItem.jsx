import React from 'react'
import styles from './Country.module.css'
import Flag from './Flag'

export default function CountryItem({ data }) {

  return (
 <div  className={styles.Country}>
      <Flag flagInfo={data.emoji} />
         <span>{data.country}</span>
       </div>  )
}
