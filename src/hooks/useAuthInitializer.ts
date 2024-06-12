import { useEffect } from 'react'
import { useAuthStore } from '../stores/useAuthStore'

export const useAuthInitializer = () => {
	const { checkAuth, loading } = useAuthStore()

	useEffect(() => {
		checkAuth()
	}, [checkAuth])

	return { loading }
}
