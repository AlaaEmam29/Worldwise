import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import AppNav from './AppNav'
import styles from './Sidebar.module.css'
export default function Sidebar() {
  return (
      <aside className={styles.Sidebar}>
          <Link to='/'>
                    <img src={logo} alt="logo" />

      </Link>
          <AppNav />

      <Outlet/>
      </aside>
  )
}
