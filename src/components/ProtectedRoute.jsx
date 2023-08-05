import React from 'react'
import { Navigate } from 'react-router'

export default function ProtectedRoute({children}) {
        const userID = localStorage.getItem("userID")
    if (!userID) {
        return <Navigate to='/' replace/>
    }
  return  children;

}
