import { create } from 'zustand'
import { OTPState } from '../types/store.interface'

export const useOTPStore = create<OTPState>(set => ({
	email: '',
	token: '',
	setEmail: email => set({ email }),
	setToken: token => set({ token }),
}))
