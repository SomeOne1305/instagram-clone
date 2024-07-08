import axios, {
	AxiosError,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios'

// Extend the Axios request config to include a _retry property
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean
}
export const API = axios.create({
	baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
	withCredentials: true,
})
API.interceptors.response.use(
	(response: AxiosResponse) => {
		return response
	},
	async (error: AxiosError) => {
		const originalRequest = error.config as CustomAxiosRequestConfig

		if (
			error.response &&
			error.response.status === 401 &&
			originalRequest &&
			!originalRequest._retry
		) {
			originalRequest._retry = true // Mark the request as retried

			try {
				await axios.post(
					import.meta.env.VITE_REACT_APP_API_BASE_URL + '/auth/refresh',
					{},
					{
						withCredentials: true,
					}
				)

				// Retry the original request with new tokens
				return API(originalRequest)
			} catch (refreshError) {
				console.log('Error refreshing token:', refreshError)
				window.location.replace('/auth/login') // Redirect to login page
			}
		}
		return Promise.reject(error)
	}
)
