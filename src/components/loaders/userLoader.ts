import { QueryClient } from '@tanstack/react-query'
import { LoaderFunction } from 'react-router-dom'
import { UserService } from '../../services/User.service'
import { useUserStore } from './../../stores/useUserStore'

const queryClient = new QueryClient()
export const userLoader: LoaderFunction = async () => {
	try {
		const user = await queryClient.fetchQuery({
			queryKey: ['GET_USER'],
			queryFn: () => UserService.getMe(),
		})
		useUserStore.getState().setUser(user)
		return user
	} catch (error) {
		throw new Error('Error fetching user data')
	}
}
