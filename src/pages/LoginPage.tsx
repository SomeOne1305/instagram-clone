import { UseMutationResult, useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import AuthInput from '../components/AuthInput'
import Logo from '../components/Logo'
import SEO from '../components/SEO'
import { Button } from '../components/ui'
import { structuredData } from '../constants/structuredSeo'
import { AuthService } from '../services/Auth.service'
import { useAuthStore } from '../stores/useAuthStore'
import { IError } from '../types/api.interface'
import { ILogin } from '../types/auth.interface'

const LoginPage = () => {
	const { reset, register, handleSubmit } = useForm()

	const { checkAuth } = useAuthStore()

	const {
		mutateAsync,
		error,
		isError,
	}: UseMutationResult<
		AxiosResponse<ILogin>,
		AxiosError<IError>,
		ILogin
	> = useMutation({
		mutationKey: ['LOGIN'],
		mutationFn: (data: ILogin) => AuthService.login(data),
	})
	const onSubmit: SubmitHandler<FieldValues> = async data => {
		const loginData: ILogin = {
			email: data.email,
			password: data.password,
		}

		await toast.promise(mutateAsync(loginData), {
			loading: 'Sending request...',
			error:
				error?.response?.data?.message === 'Invalid user credentials'
					? 'Email or password is incorrect'
					: 'Something went wrong',
			success: 'Logged in successfully!',
		})
		reset()
		setTimeout(() => {
			checkAuth()
		}, 1000)
	}

	return (
		<div className='w-full'>
			<SEO
				title='Авторизация | Instagram'
				description='This is the login page of my website.'
				keywords='login, awesome website,instagram, instagram-clone, github, insta clone, instagram project, instagram clone react js'
				author='Kholmuminov Ahmadullo'
				ogUrl={window.location.pathname}
				ogImage='https://example.com/image.jpg'
				twitterCard='summary_large_image'
				twitterCreator='@yourtwitterhandle'
				structuredData={structuredData}
			/>
			<div className='p-4 border border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center'>
				<div className='py-3 my-3 mx-auto w-auto inline-flex'>
					<Logo className='dark:text-slate-100' type='img' />
				</div>
				<form
					id='login-form'
					className='w-full mt-3 flex flex-col'
					onSubmit={handleSubmit(onSubmit)}
					autoComplete='on'
				>
					<AuthInput
						type='email'
						label='Email'
						id='email'
						{...register('email', { required: true })}
					/>
					<AuthInput
						type='password'
						label='Password'
						id='password'
						{...register('password', { required: true })}
					/>
					{isError && (
						<div className='text-center'>
							<span className='text-xs text-red-500 mt-1'>
								{error.response?.data?.details?.message}
							</span>
						</div>
					)}
					<Button
						type='submit'
						className='text-md mt-5 w-full text-center py-1.5'
					>
						Войти
					</Button>
					<div className='w-full flex items-center py-2 mt-4'>
						<div className='w-full h-0.5 bg-gray-300 dark:bg-gray-600'></div>
						<span className='text-lg uppercase mx-3 text-gray-500 dark:text-slate-300'>
							или
						</span>
						<div className='w-full h-0.5 bg-gray-300 dark:bg-gray-600'></div>
					</div>
					<div className='text-center mt-3'>
						<Link
							to={'/auth/forgot-password'}
							className='text-sm text-blue-600 hover:underline'
						>
							Забыли пароль ?
						</Link>
					</div>
				</form>
			</div>
			<div className='w-full py-3 text-center border border-gray-300 dark:border-gray-600 mt-4'>
				<span className='text-sm dark:text-slate-100'>
					Нет аккаунта ?{' '}
					<Link
						to='/auth/register'
						className='text-blue-500 hover:text-blue-600 font-bold ml-0.5'
					>
						Зарегистрироваться
					</Link>
				</span>
			</div>
		</div>
	)
}

export default LoginPage
