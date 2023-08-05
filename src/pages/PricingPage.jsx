import React from 'react'
import img from '../assets/images/img-2.jpg'
import styles from './PricingPage.module.css'
export default function PricingPage() {
  return (
      <div className={styles.pricingpage}>
          <div className="row">
              <div className="col">
                  <h1>
                      Simple pricing.
                      <br/>
                    Just $9/month.
                  </h1>
                  <p>
                      Upgrade to our premium plan for just $9 per month.
                      Experience exclusive features, seamless integration, and priority support.
                      Join now and unlock your full potential!
                  </p>
              </div>
              <div className="col">
              <img src={img} alt="" />
              </div>
          </div>
    </div>
  )
}
