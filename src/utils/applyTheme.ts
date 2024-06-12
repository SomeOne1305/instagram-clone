export const applyTheme = (theme: 'dark' | 'light') => {
	const root = window.document.documentElement
	root.classList.remove(theme === 'dark' ? 'light' : 'dark')
	root.classList.add(theme)
}
