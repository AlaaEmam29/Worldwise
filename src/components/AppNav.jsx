import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './APPNav.module.css'
export default function AppNav() {
  return (
    <nav className={styles.nav}>
    
          <ul>
              <li>
                   <NavLink to='cities' activeclassname="active">
                  Cities
              </NavLink>
             </li>
              <li>
                   <NavLink to="countries" activeclassname="active">
                  countries               
              </NavLink>
              </li>
          </ul>
      </nav>
  )
}
