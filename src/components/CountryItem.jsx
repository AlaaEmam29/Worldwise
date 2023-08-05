import React from 'react'
import styles from './Country.module.css'
import { useAppContext } from '../context/AppContext'

export default function CountryItem({ data }) {
  const {flag} = useAppContext()
      const flagText = flag(data.emoji)

  return (
 <div  className={styles.Country}>
         <span><img src={`https://flagcdn.com/24x18/${flagText}.png`} alt={`flag ${flagText}`} /></span>
         <span>{data.country}</span>
       </div>  )
}
