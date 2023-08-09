import React from 'react'
import { Navigate } from 'react-router'
import { useAuthContext } from '../context/AuthContext'

export default function ProtectedRoute({children}) {
        const {state} = useAuthContext()
    if (!state.user?.uid) {
        return <Navigate to='/' replace/>
    }
  return  children;

}
