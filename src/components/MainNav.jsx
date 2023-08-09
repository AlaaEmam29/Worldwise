import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import styles from './MainNav.module.css'
import Button from './Button'
import { useAuthContext } from '../context/AuthContext'
export default function MainNav() {
    const { state } = useAuthContext()
  return (
      <nav className={styles.nav}>
          <Link to='/'>
                        <img src={logo} alt="logo" width="200" height="100"/>

          </Link>
          <ul>
              <li>
                   <NavLink to='/price' activeclassname="active">
                  pricing
              </NavLink>
             </li>
              <li>
                    <NavLink to="/product" activeclassname="active">
                  product
              </NavLink>
              </li>
              {!state.user?.uid && <li>
                     <NavLink to='/login'>
                  <Button type="green">
                      Login
                  </Button>
              </NavLink>
              </li>}
              
          </ul>
      </nav>
  )
}
