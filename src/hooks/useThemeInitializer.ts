// hooks/useThemeInitializer.js
import { useEffect } from 'react'
import useThemeStore from '../stores/useThemeStore'
import { applyTheme } from '../utils/applyTheme'

export const useThemeInitializer = () => {
	const { theme } = useThemeStore()

	useEffect(() => {
		applyTheme(theme)
	}, [theme])
}
