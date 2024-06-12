import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ITheme } from '../types/store.interface'

const useThemeStore = create(
	persist<ITheme>(
		set => ({
			theme: window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light',
			setTheme: () =>
				set(state => ({
					theme: state.theme === 'light' ? 'dark' : 'light',
				})),
		}),
		{
			name: 'theme',
		}
	)
)

export default useThemeStore
