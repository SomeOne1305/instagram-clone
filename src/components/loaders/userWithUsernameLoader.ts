import { LoaderFunctionArgs } from 'react-router-dom'
import { UserService } from '../../services/User.service'
import { IUserWithUsername } from '../../types/user.interface'

export const userWithUsernameLoader = async ({
	params,
}: LoaderFunctionArgs): Promise<IUserWithUsername> => {
	const { username } = params
	if (!username) {
		throw new Error('Username is required')
	}
	return await UserService.getUserByUserName(username)
}
