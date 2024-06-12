// UserService.js
import { IUpdateUser, IUser, IUserWithUsername } from '../types/user.interface'
import { API } from './api'

export const UserService = {
	async getMe() {
		const response = await API.get<IUser>('users/user')
		return response.data
	},
	async getUserByUserName(username: string) {
		return (await API.get<IUserWithUsername>('users/username/' + username)).data
	},
	async setProfile(data: FormData) {
		return (await API.post('users/profile', data)).data
	},
	async deleteProfile(fileId: string) {
		return (await API.delete('users/profile/' + fileId)).data
	},
	async updateInfo(data: IUpdateUser) {
		return (await API.put('users/update-me', data)).data
	},
	async getFollowers(userId: string) {
		return (await API.get<IUser[]>('followers/followers/' + userId)).data
	},
	async getFollowings(userId: string) {
		return (await API.get<IUser[]>('followers/followings/' + userId)).data
	},
	async getUserPosts(userID: string) {
		return (await API.get('posts/user/' + userID)).data
	},
	async follow(userID: string) {
		return (await API.post('followers/' + userID)).data
	},
	async unfollow(userID: string) {
		return (await API.delete('followers/' + userID)).data
	},
	async search(query: string) {
		return (await API.post<IUser[]>('users/search?query=' + query)).data
	},
	async deleteUser() {
		return (await API.delete('users/delete-me')).data
	},
}
