import React, { memo } from 'react'
import styles from './AppLayout.module.css'
import Sidebar from '../components/Sidebar'
import Map from '../components/Map'
import User from '../components/User'
function AppChildren({children}){
  return children
}
memo 
export default function AppLayout() {
  return (
      <div className={styles.AppLayout}>
          
<AppChildren>
<Sidebar/>
      <Map/>
      <User/>
  </AppChildren>
      
    </div>
  )
}
