import { useMutation } from '@tanstack/react-query'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaEnvelope } from 'react-icons/fa'
import { GoLock } from 'react-icons/go'
import { Link, useNavigate } from 'react-router-dom'
import AuthInput from '../components/AuthInput'
import SEO from '../components/SEO'
import { Button } from '../components/ui'
import { structuredData } from '../constants/structuredSeo'
import { AuthService } from '../services/Auth.service'
import { useOTPStore } from '../stores/useOtpStore'
import { ISendOTP } from '../types/auth.interface'

const ForgotPassword = () => {
	const navigate = useNavigate()
	const { register, handleSubmit } = useForm()
	const { setEmail } = useOTPStore()
	const { mutateAsync } = useMutation({
		mutationKey: ['SEND_EMAIL'],
		mutationFn: (data: ISendOTP) => AuthService.sendOTP(data),
	})
	const sendOtp: SubmitHandler<FieldValues> = async data => {
		const info = {
			email: data.email,
		}
		await toast.promise(mutateAsync(info), {
			success: (
				<span>
					Your code is sent to{' '}
					<span className='text-blue-500 text-base'>{data.email}</span>
				</span>
			),
			error: 'Error occured',
			loading: 'Sending request...',
		})
		setEmail(data.email)
		navigate('/auth/verify-otp', { replace: true })
	}
	return (
		<div className='w-full p-2'>
			<SEO
				title='Сбросить пароля | Instagram'
				description='This is the reset password page of my website.'
				keywords='reset pass, awesome website,instagram, instagram-clone, github, insta clone, instagram project, instagram clone react js, reset password instagram, facebook'
				author='Kholmuminov Ahmadullo'
				ogUrl={window.location.pathname}
				ogImage='https://example.com/image.jpg'
				twitterCard='summary_large_image'
				twitterCreator='@yourtwitterhandle'
				structuredData={structuredData}
			/>
			<form
				autoComplete='on'
				onSubmit={handleSubmit(sendOtp)}
				className='w-full p-4 border border-gray-300 dark:border-gray-600 flex flex-col'
			>
				<div className='w-full mt-3'>
					<div className='size-16 border-2 border-black rounded-full dark:border-slate-100 flex items-center justify-center mx-auto'>
						<GoLock className='text-2xl dark:text-slate-100' />
					</div>
				</div>
				<div className='w-full py-2 my-3 text-center'>
					<h2 className='text-xl font-bold dark:text-slate-100'>
						Сбросить пароля
					</h2>
				</div>
				<AuthInput
					label='Электронная почта'
					type='email'
					{...register('email', { required: true })}
				/>
				<Button
					type='submit'
					className='w-full flex items-center justify-center py-2 my-3'
				>
					<FaEnvelope className='text-lg mr-1' />
					<span className='text-base'>Отправить код</span>
				</Button>
			</form>
			<div className='w-full py-3 text-center border border-gray-300 dark:border-gray-600 mt-4'>
				<span className='text-sm dark:text-slate-100'>
					У вас нет учетной записи ?{' '}
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

export default ForgotPassword
