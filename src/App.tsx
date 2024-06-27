import { useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import toast, { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'
import Loading from './components/Loading'
import { useAuthInitializer } from './hooks/useAuthInitializer'
import { useThemeInitializer } from './hooks/useThemeInitializer'
import { useUserData } from './hooks/useUserData'
import { useUserStore } from './stores/useUserStore'

const App = () => {
	useThemeInitializer()
	const { loading } = useAuthInitializer()
	const { setUser } = useUserStore()

	const { data: user, isLoading, error } = useUserData()

	useEffect(() => {
		if (user) {
			setUser(user)
		}
	}, [user, setUser])

	if (isLoading || loading) {
		return <Loading />
	}

	if (error) {
		toast.error('Error occured in data fetching.')
	}

	return (
		<div className='w-full min-h-screen py-4'>
			<Toaster position='top-center' />
			<HelmetProvider>
				<Outlet />
			</HelmetProvider>
		</div>
	)
}

export default App
