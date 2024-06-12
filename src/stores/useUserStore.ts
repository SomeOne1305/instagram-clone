// useUserStore.js
import { create } from 'zustand'
import { UserState } from '../types/store.interface'
import { IUser } from './../types/user.interface'

export const useUserStore = create<UserState>(set => ({
	user: null,
	setUser: (user: IUser) => set({ user }), // Correctly update the user state
}))
