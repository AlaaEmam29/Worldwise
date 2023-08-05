import React from 'react'
import img from '../assets/images/img-1.jpg'
import styles from './ProductPage.module.css'
export default function ProductPage() {
  return (
    <div className={styles.productpage}>

         <div className={`row ${styles.rowGap}`}>
              <div className='col'>
          <img src={img} alt="" className={ styles.img} />
              </div>
        <div className={`${styles.col} ${styles["col-product"]}`}>
          <div>
            <h1>
              About WorldWide
            </h1>
            <p>
              WorldWide is your ultimate travel companion, designed to enrich your journeys and expand your horizons. Our team is driven by a passion for exploration and a commitment to creating unforgettable travel experiences for adventurers like you.


            </p>
          </div>
          <div>
            <h1>
              Our Vision
            </h1>
            <p>
              At WorldWide, our vision is to connect people across the globe, transcending borders and cultures. We believe in the transformative power of travel and its ability to foster understanding, compassion, and personal growth.

            </p>
            
          </div>
              </div>
          </div>
    </div>
  )
}
