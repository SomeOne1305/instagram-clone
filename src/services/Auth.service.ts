import {
	ILogin,
	INewPass,
	IRegister,
	ISendOTP,
	IVerifyOTP,
} from '../types/auth.interface'
import { API } from './api'

export const AuthService = {
	async login(data: ILogin) {
		return (await API.post('/auth/login', data)).data
	},
	async register(data: IRegister) {
		return (await API.post('/auth/register', data)).data
	},
	async sendOTP(data: ISendOTP) {
		return (await API.post('/auth/send-otp', data)).data
	},
	async verifyOTP(data: IVerifyOTP) {
		return (await API.post('/auth/verify-otp', data)).data
	},
	async setNewPass(data: INewPass) {
		return (await API.post('/auth/reset-password', data)).data
	},
	async logout() {
		return (await API.post('/auth/logout')).data
	},
}
