import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import { useAuthStore } from '../stores/useAuthStore'

const UserLayout = () => {
	const { isAuthenticated } = useAuthStore()

	return (
		<div className='w-full'>
			<Navbar />
			{isAuthenticated ? <Outlet /> : <Navigate to={'/auth/login'} />}
		</div>
	)
}

export default UserLayout
