import Cookie from 'universal-cookie'
import { create } from 'zustand'

// Create an instance of Cookie
const cookies = new Cookie()

interface AuthState {
	isAuthenticated: boolean
	loading: boolean
	checkAuth: () => void
}

export const useAuthStore = create<AuthState>(set => ({
	isAuthenticated: false,
	loading: true,
	checkAuth: async () => {
		set({ loading: true })
		setTimeout(async () => {
			const refreshToken = cookies.get('refresh_token')
			set({ isAuthenticated: !!refreshToken, loading: false })
			console.clear()
			console.log(`
░░░░░███░░░░░░░░░░░░░░░░░░░░░░░░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░██░██░░░░░░░░░░░░░░░░░░░░░░░░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░██░░██░░░░░░░░░░░░░░░░░░░░░░█████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░██░░░██░░░██░░░░██░░░░░░███░░░░░██░░░░░░████░█░░░░░░███░██░░░██░░░░░░░░░████░█░░░░██░░██░░░░██░░░░░
░██░░░██░░░██░░█████░░░░███░░░░░░██░░░░███░░░███░░░███░░████░░███████░░░██░░░███░░░██░████░░████░░░░
░░░█░░██░░░██░██░░██░░░░███░░░░░░██░░░░██░░░░███░░░██░░░░███░░██░░██░░░███░░░░██░░░████░██░████░░░░░
░░░░░░██░░░████░░░██░░░█░░░███░░███░░░░██░░░░███░░░██░░░░██░░██░░░██░░░██░░░░░██░░░███░░████░██░░░░░
░░░░░░██░░░███░░░░██░░█░░░░░███████░░░███░░░░███░░░██░░░░████░░░░░██░░░██░░░░███░░░███░░████░░██░░█░
░░░░░░██░░░███░░░░████░░███████░░█████░███░░████░░████░█████░░░░░░███░█████░████░░████░░░██░░░█████░
░░░░░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░███░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░███░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
				`)
		}, 2000)
	},
}))
