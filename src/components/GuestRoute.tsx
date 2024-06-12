// GuestRoute.js
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores/useAuthStore'

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
	const location = useLocation()
	const { isAuthenticated } = useAuthStore()
	if (isAuthenticated) {
		return <Navigate to='/' state={{ from: location.pathname }} replace />
	}

	return <>{children}</>
}

export default GuestRoute
