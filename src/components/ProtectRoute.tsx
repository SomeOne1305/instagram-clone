// ProtectedRoute.js
import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { Navigate, useLocation } from 'react-router-dom'
import { UserService } from '../services/User.service'
import { useAuthStore } from '../stores/useAuthStore'
import { useUserStore } from '../stores/useUserStore'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const location = useLocation()
	const { isAuthenticated } = useAuthStore()
	const queryClient = useQueryClient()
	const { setUser } = useUserStore()

	useEffect(() => {
		queryClient
			.fetchQuery({
				queryKey: ['GET_USER'],
				queryFn: () => UserService.getMe(),
			})
			.then(data => setUser(data))
			.catch(err => {
				console.log(err)

				toast.error('Error occured on protected route')
			})
	}, [queryClient, setUser])

	if (!isAuthenticated) {
		return (
			<Navigate to='/auth/login' state={{ from: location.pathname }} replace />
		)
	}

	return <>{children}</>
}

export default ProtectedRoute
