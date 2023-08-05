import React from 'react'
import { useAppContext } from '../context/AppContext'

export default function Flag(props) {
    const { flag } = useAppContext()
   const flagText = flag(props.flagInfo)
  return (
                <span><img src={`https://flagcdn.com/24x18/${flagText}.png`} alt={`flag ${flagText}`} /></span>
  )
}
