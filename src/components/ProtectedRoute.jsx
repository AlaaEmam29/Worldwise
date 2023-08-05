import React from 'react'
import { Navigate } from 'react-router'
import { useAuthContext } from '../context/AuthContext';

export default function ProtectedRoute({children}) {
  const { state } = useAuthContext()
        const userID = localStorage.getItem("userID")

    if (!state?.user?.uid || !userID) {
        return <Navigate to='/' replace/>
    }
  return  children;

}
