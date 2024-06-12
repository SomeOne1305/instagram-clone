import { IUser } from './user.interface'

export interface TypeState {
	isMuted: boolean
	setIsMuted: (arg: boolean) => void
}
export interface ITheme {
	theme: 'dark' | 'light'
	setTheme: (theme: string) => void
}

export interface OTPState {
	email: string
	token: string
	setEmail: (email: string) => void
	setToken: (token: string) => void
}

export interface UserState {
	user: IUser | null
	setUser: (arg: IUser) => void
}
