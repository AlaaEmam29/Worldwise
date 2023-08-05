import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'
export default function NotFoundPage() {
  return <div className={styles.notfound}>
                        <h1>
                    404
                    </h1>
                    <p> <span style={{color : "red"}}>Opps!</span> Page not found.</p>
                    <p>
                        The page you’re looking for doesn’t exist.
                    </p>
                    <Link to='/' className="btn btn-green">Go Home</Link>

        </div>

  
}
