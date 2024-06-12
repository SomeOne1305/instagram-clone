import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { UserService } from '../services/User.service'
import { useAuthStore } from '../stores/useAuthStore'
import { useUserStore } from '../stores/useUserStore'

const UserDataFetcher = () => {
	const { isAuthenticated } = useAuthStore()
	const { setUser } = useUserStore()

	const { data, isSuccess } = useQuery({
		queryKey: ['get-user'],
		queryFn: () => UserService.getMe(),
		enabled: isAuthenticated,
	})

	useEffect(() => {
		if (isAuthenticated && isSuccess && data) {
			setUser(data)
		}
	}, [isAuthenticated, isSuccess, data, setUser])

	return null
}

export default UserDataFetcher
