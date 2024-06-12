import { useMutation } from '@tanstack/react-query'
import React, { FC, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { MdOutlinePassword } from 'react-icons/md'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui'
import '../css/Otp.css'
import { AuthService } from '../services/Auth.service'
import { useOTPStore } from '../stores/useOtpStore'
import { IVerifyOTP } from '../types/auth.interface'

interface IOtpComponent {
	otp: string[]
	setOtp: (arg: string[]) => void
}
let currentOTPIndex: number = 0
const OTPField: FC<IOtpComponent> = ({ otp, setOtp }) => {
	const [activeOTPIndex, setActiveOTPIndex] = useState(0)

	const inputRef = useRef<HTMLInputElement>(null)

	const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = target
		const newOTP: string[] = [...otp]
		newOTP[currentOTPIndex] = value.substring(value.length - 1)

		if (!value) setActiveOTPIndex(currentOTPIndex - 1)
		else setActiveOTPIndex(currentOTPIndex + 1)

		setOtp(newOTP)
	}

	const handleOnKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		currentOTPIndex = index
		if (e.key === 'Backspace') setActiveOTPIndex(currentOTPIndex - 1)
	}

	useEffect(() => {
		inputRef.current?.focus()
	}, [activeOTPIndex])

	return (
		<div className={' flex justify-center items-center space-x-1 md:space-x-2'}>
			{otp.map((_, index) => {
				return (
					<React.Fragment key={index}>
						<input
							ref={activeOTPIndex === index ? inputRef : null}
							type='number'
							className={
								'w-10 h-10 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl border-gray-600 dark:text-slate-100 focus:border-blue-500 focus:text-blue-500 transition otp'
							}
							onChange={handleOnChange}
							onKeyDown={e => handleOnKeyDown(e, index)}
							value={otp[index]}
						/>
						{index === otp.length - 1 ? null : <span className={'px-0.5'} />}
					</React.Fragment>
				)
			})}
		</div>
	)
}

const VerifyOtpPage = () => {
	const { email } = useOTPStore()
	const [otp, setOtp] = useState(new Array(6).fill(''))
	const location = useLocation()
	const navigate = useNavigate()
	const { setToken, token } = useOTPStore()
	const { mutateAsync } = useMutation({
		mutationKey: ['SEND_OTP'],
		mutationFn: (form: IVerifyOTP) => AuthService.verifyOTP(form),
		onSuccess: res => {
			setToken(res.token)
			setOtp(new Array(6).fill(''))
			navigate('/auth/new-pass', {
				replace: true,
				state: { from: location.pathname },
			})
		},
	})
	if (!email) {
		return (
			<Navigate
				to={'/auth/forgot-password'}
				state={{ from: location.pathname }}
				replace
			/>
		)
	}
	const sendForm = async () => {
		const formData: IVerifyOTP = {
			email,
			code: otp.join(''),
		}
		await toast.promise(mutateAsync(formData), {
			loading: 'Sending request...',
			error: 'Something went wrong',
			success: 'Verified !',
		})
		console.log(token)
	}
	return (
		<div className='w-full p-2'>
			<div className='w-full p-4 border border-gray-300 dark:border-gray-600 flex flex-col'>
				<div className='w-full'>
					<div className='size-16 border-2 border-black rounded-full dark:border-slate-100 flex items-center justify-center mx-auto'>
						<MdOutlinePassword className='text-2xl dark:text-slate-100' />
					</div>
				</div>
				<div className='w-full py-2 my-3 text-center'>
					<h2 className='text-xl font-bold dark:text-slate-100'>
						Подтвердить одноразовый код
					</h2>
					<p className='text-sm mt-3 text-gray-500'>
						Введите код, который был отправлен на{' '}
						<span className='text-blue-500'>{email}</span>
					</p>
				</div>
				<div className='w-full py-4'>
					<OTPField otp={otp} setOtp={setOtp} />
					<Button
						className='w-full text-center py-1.5 mt-6'
						disabled={otp.join('').length < 6}
						onClick={() => sendForm()}
					>
						Подвердить
					</Button>
				</div>
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

export default VerifyOtpPage
