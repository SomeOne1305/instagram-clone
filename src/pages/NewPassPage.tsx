import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { FiUnlock } from 'react-icons/fi'
import { Link, Navigate } from 'react-router-dom'
import AuthInput from '../components/AuthInput'
import SEO from '../components/SEO'
import { Button } from '../components/ui'
import { structuredData } from '../constants/structuredSeo'
import { AuthService } from '../services/Auth.service'
import { useAuthStore } from '../stores/useAuthStore'
import { useOTPStore } from '../stores/useOtpStore'
import { INewPass } from '../types/auth.interface'

const NewPassPage = () => {
	const [newPass, setNewPass] = useState<string>('')
	const [repeatPass, setRepeatPass] = useState<string>('')
	const { email, token } = useOTPStore()
	const { checkAuth } = useAuthStore()
	const { mutateAsync } = useMutation({
		mutationKey: ['SET_NEW_PASS'],
		mutationFn: (form: INewPass) => AuthService.setNewPass(form),
	})
	const sendNewPass = async () => {
		const formData = {
			email,
			newPassword: newPass,
			token,
		}
		await toast.promise(mutateAsync(formData), {
			loading: 'Sending request...',
			success: 'Your password is updated successfully !',
			error: 'Error occured',
		})
		setTimeout(() => {
			checkAuth()
		}, 800)
	}

	if (!email && !token) return <Navigate to={'/auth/forgot-password'} replace />

	return (
		<div className='w-full p-2'>
			<SEO
				title='Установить новый пароль | Instagram'
				description='This is the set new password page of my website.'
				keywords='reset pass, awesome website,instagram, instagram-clone, github, insta clone, instagram project, instagram clone react js, reset password instagram, facebook'
				author='Kholmuminov Ahmadullo'
				ogUrl='https://example.com/'
				ogImage='https://example.com/image.jpg'
				twitterCard='summary_large_image'
				twitterCreator='@yourtwitterhandle'
				structuredData={structuredData}
			/>
			<div className='w-full p-4 border border-gray-300 dark:border-gray-600 flex flex-col'>
				<div className='w-full'>
					<div className='size-16 border-2 border-black rounded-full dark:border-slate-100 flex items-center justify-center mx-auto'>
						<FiUnlock className='text-2xl dark:text-slate-100' />
					</div>
				</div>
				<div className='w-full py-2 my-3 text-center'>
					<h2 className='text-xl font-bold dark:text-slate-100'>
						Установить новый пароль
					</h2>
					<p className='text-sm mt-3 text-gray-500'>
						Введите новый пароль, который вы сможете запомнить
					</p>
				</div>
				<div className='w-full py-4 flex flex-col'>
					<div className='relative flex items-center'>
						<AuthInput
							type='password'
							label='Новый пароль'
							id='new-password'
							onChange={e => setNewPass(e.target.value)}
							value={newPass}
						/>

						<div className='absolute top-5 right-2'>
							{newPass?.length >= 8 && (
								<FaCheck className='text-lg text-green-500' />
							)}
							{newPass?.length >= 1 && newPass?.length < 8 && (
								<FaTimes className='text-lg text-red-500' />
							)}
						</div>
					</div>
					<div className='relative flex items-center'>
						<AuthInput
							type='password'
							label='Повторите пароль'
							id='repeat-password'
							onChange={e => setRepeatPass(e.target.value)}
							value={repeatPass}
						/>

						<div className='absolute top-5 right-2'>
							{newPass?.length >= 8 &&
								repeatPass?.length >= 8 &&
								newPass == repeatPass && (
									<FaCheck className='text-lg text-green-500' />
								)}
						</div>
					</div>
					<Button
						className='w-full text-center py-1.5 mt-6'
						disabled={
							!(
								newPass?.length >= 8 &&
								repeatPass?.length >= 8 &&
								newPass == repeatPass
							)
						}
						onClick={() => sendNewPass()}
					>
						Подвердить
					</Button>
				</div>
			</div>
			<div className='w-full py-3 text-center border border-gray-300 dark:border-gray-600 mt-4'>
				<span className='text-sm dark:text-slate-100'>
					Have an account?{' '}
					<Link
						to='/auth/login'
						className='text-blue-500 hover:text-blue-600 font-bold ml-0.5'
					>
						Log in
					</Link>
				</span>
			</div>
		</div>
	)
}

export default NewPassPage
