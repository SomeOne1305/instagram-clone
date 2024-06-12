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
import { IRegister } from '../types/auth.interface'

const RegisterPage = () => {
	const { register, reset, handleSubmit } = useForm()
	const {
		mutateAsync,
		isError,
		error,
	}: UseMutationResult<
		AxiosResponse<IRegister>,
		AxiosError<IError>,
		IRegister
	> = useMutation({
		mutationKey: ['REGISTER'],
		mutationFn: (data: IRegister) => AuthService.register(data),
	})
	const { checkAuth } = useAuthStore()
	const onSubmit: SubmitHandler<FieldValues> = async data => {
		const formData: IRegister = {
			email: data.email,
			fullName: data.fullName,
			username: data.username,
			password: data.password,
		}
		await toast.promise(mutateAsync(formData), {
			success: 'Registration done !',
			error: 'Registration failed',
			loading: 'Sending request !',
		})
		reset()
		setTimeout(() => {
			checkAuth()
		}, 1000)
	}
	return (
		<div className='w-full'>
			<SEO
				title='Зарегистеравация | Instagram'
				description='This is the register page of my website.'
				keywords='register, register page, awesome website,instagram, instagram-clone, github, insta clone, instagram project, instagram clone react js, insta project react, instagram register'
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
				<div className='w-full text-center my-2'>
					<h3 className='text-md font-bold text-gray-600 dark:text-gray-300'>
						Зарегистрируйтесь, чтобы просматривать фотографии и видео своих
						друзей.
					</h3>
				</div>
				<form
					id='register-form'
					className='w-full mt-3 flex flex-col'
					autoComplete='on'
					onSubmit={handleSubmit(onSubmit)}
				>
					<AuthInput
						type='email'
						label='Электронная почта'
						id='email'
						{...register('email', { required: true })}
					/>
					<AuthInput
						type='text'
						label='Полное имя'
						id='fullname'
						{...register('fullName', { required: true })}
					/>
					<AuthInput
						type='text'
						label='Имя пользователя'
						id='username'
						{...register('username', { required: true })}
					/>
					<AuthInput
						type='password'
						label='Пароль'
						id='password'
						{...register('password', { required: true })}
					/>
					<Button
						disabled={false}
						className='text-md mt-5 w-full text-center py-1.5'
					>
						Зарегистрироваться
					</Button>

					{isError && (
						<div className='py-3 text-center'>
							{Array.isArray(error.response?.data?.details?.message) ? (
								error.response?.data?.details?.message?.map(item => (
									<>
										<span className='text-xs text-red-500'>{item}</span>
										<br />
									</>
								))
							) : (
								<>
									<span className='text-xs text-red-500'>
										{error.response?.data?.details?.message}
									</span>
									<br />
								</>
							)}
						</div>
					)}
				</form>
			</div>
			<div className='w-full py-3 text-center border border-gray-300 dark:border-gray-600 mt-4'>
				<span className='text-sm dark:text-slate-100'>
					Иметь аккаунт ?{' '}
					<Link
						to='/auth/login'
						className='text-blue-500 hover:text-blue-600 font-bold ml-0.5'
					>
						Войти
					</Link>
				</span>
			</div>
		</div>
	)
}

export default RegisterPage
