import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import styles from './HomePage.module.css'
export default function HomePage() {
    const {state} = useAuthContext()
  return (
      <div className={styles.homepage}>
          <section>
              <h1>You travel the world. 
                  <br />
                  WorldWise keeps track of your adventures.
              </h1>
              <h2>A world map that tracks your footsteps into every city you can think of. Never forget your wonderful experiences, and show your friends how you have wandered the world.</h2>
              <div>
                 {state.user?.uid ? <Link to='/app' className="btn btn-green">start tracking now</Link>  : <Link to='/login' className="btn btn-green">start tracking now</Link> }
                  
              </div>
          </section>
    </div>
  )
}
