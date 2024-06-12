import { useQuery } from '@tanstack/react-query'
import { UserService } from '../services/User.service'
import { useAuthStore } from '../stores/useAuthStore'
import { IUser } from '../types/user.interface'

export const useUserData = () => {
	const { isAuthenticated } = useAuthStore()
	return useQuery<IUser>({
		queryKey: ['GET_USER'],
		queryFn: () => UserService.getMe(),
		enabled: isAuthenticated,
	})
}
