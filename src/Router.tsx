import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom'
import App from './App'
import GuestRoute from './components/GuestRoute'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectRoute'
import SearchResults from './components/SearchResults'
import { userLoader } from './components/loaders/userLoader'
import { userWithUsernameLoader } from './components/loaders/userWithUsernameLoader'
import { AuthLayout, UserLayout } from './layouts'
import {
	AccountEditPage,
	ForgotPassword,
	HomePage,
	LoginPage,
	NewPassPage,
	RegisterPage,
	SearchPage,
	UserPage,
	VerifyOtpPage,
} from './pages'

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App />}>
			<Route element={<UserLayout />}>
				<Route path='' element={<HomePage />} />
				<Route
					path=':username'
					element={<UserPage />}
					loader={userWithUsernameLoader}
					errorElement={<NotFound />}
				/>
				<Route
					path='account/edit'
					element={
						<ProtectedRoute>
							<AccountEditPage />
						</ProtectedRoute>
					}
					loader={userLoader}
				/>
				<Route
					path='search'
					element={
						<ProtectedRoute>
							<SearchPage />
						</ProtectedRoute>
					}
					loader={userLoader}
				>
					<Route path='' element={<SearchResults />} />
				</Route>
			</Route>
			<Route path='auth' element={<AuthLayout />}>
				<Route
					path='login'
					element={
						<GuestRoute>
							<LoginPage />
						</GuestRoute>
					}
				/>
				<Route
					path='register'
					element={
						<GuestRoute>
							<RegisterPage />
						</GuestRoute>
					}
				/>
				<Route
					path='forgot-password'
					element={
						<GuestRoute>
							<ForgotPassword />
						</GuestRoute>
					}
				/>
				<Route
					path='verify-otp'
					element={
						<GuestRoute>
							<VerifyOtpPage />
						</GuestRoute>
					}
				/>
				<Route
					path='new-pass'
					element={
						<GuestRoute>
							<NewPassPage />
						</GuestRoute>
					}
				/>
			</Route>
		</Route>
	)
)
