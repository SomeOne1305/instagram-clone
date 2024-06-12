import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import {
	Controller,
	FieldValues,
	SubmitHandler,
	useForm,
} from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaCheck, FaTimes } from 'react-icons/fa'
import UserDataFetcher from '../components/UserDataFetcher'
import { Button, Dialog, Modal } from '../components/ui'
import Input from '../components/ui/Input'
import { UserService } from '../services/User.service'
import { useAuthStore } from '../stores/useAuthStore'
import { useUserStore } from '../stores/useUserStore'
import { IUpdateUser } from '../types/user.interface'
const ChangePasswordForm = () => {
	const [newPassword, setNewPassword] = useState<string>('')
	const [newPasswordTwo, setNewPasswordTwo] = useState<string>('')
	return (
		<div className='w-full'>
			<div className='flex items-center'>
				<div className='w-full mb-4 relative mr-2'>
					<label className='block text-gray-700 dark:text-slate-100'>
						Previous password
					</label>
					<Input
						type='password'
						className='mt-1 w-full p-3 border border-gray-600 rounded-md bg-transparent dark:text-slate-100 text-sm'
					/>
				</div>
				<div className='w-full mb-4 relative mr-2'>
					<label className='block text-gray-700 dark:text-slate-100'>
						New Password
					</label>
					<Input
						type='password'
						className='mt-1 w-full p-3 border border-gray-600 rounded-md bg-transparent dark:text-slate-100 text-sm'
						value={newPassword}
						onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
							setNewPassword(e.target.value)
						}
					/>
				</div>
				<div className='w-full mb-4 relative'>
					<label className='block text-gray-700 dark:text-slate-100'>
						Repeat password
					</label>
					<Input
						type='password'
						className='mt-1 w-full p-3 border border-gray-600 rounded-md bg-transparent dark:text-slate-100 text-sm'
						value={newPasswordTwo}
						onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
							setNewPasswordTwo(e.target.value)
						}
					/>
					<div className='absolute top-10 right-3 h-auto w-auto '>
						{newPassword === newPasswordTwo &&
						newPassword.length >= 8 &&
						newPasswordTwo.length >= 8 ? (
							<FaCheck className='text-lg text-green-500' />
						) : (
							newPassword.length >= 8 &&
							newPasswordTwo.length >= 8 && (
								<FaTimes className='text-lg text-red-500' />
							)
						)}
					</div>
					{/* <FaTimes className='text-lg text-red-500' /> */}
				</div>
			</div>
			<div className='w-full py-3 flex justify-end'>
				<Button className='mt-2 px-2 py-1.5'>Изменить</Button>
			</div>
		</div>
	)
}
const ChangeInfoForm = () => {
	const { user } = useUserStore()
	const { isAuthenticated } = useAuthStore()
	const { control, handleSubmit } = useForm()
	const [fullName, setFullName] = useState(user?.fullName)
	const [bio, setBio] = useState(user?.bio)

	const updateInfo = useMutation({
		mutationKey: ['UPDATE_INFO'],
		mutationFn: (formData: IUpdateUser) => UserService.updateInfo(formData),
	})
	const client = useQueryClient()
	const onSubmit: SubmitHandler<FieldValues> = async data => {
		const formData: IUpdateUser = {
			fullName: data.fullName,
			bio: data.bio,
		}
		toast.promise(updateInfo.mutateAsync(formData), {
			loading: 'Sending request...',
			error: 'Error occured.',
			success: 'Updated !',
		})
		await client
			.refetchQueries({ queryKey: ['GET_USER'] })
			.then(() => toast.success('Done !'))
	}

	if (!user && isAuthenticated) {
		return UserDataFetcher()
	}

	return (
		<form
			className='w-full mt-3'
			onSubmit={handleSubmit(onSubmit)}
			id='edit-user-data'
		>
			<h3 className='font-bold text-xl py-2 mb-2 mt-3  dark:text-slate-100'>
				Полное имя
			</h3>
			<div className='p-2 border border-slate-600 rounded-lg'>
				<Controller
					control={control}
					name='fullName'
					render={({ field: { onChange, ref, name, onBlur, disabled } }) => (
						<Input
							type='text'
							className='w-full p-1 bg-transparent dark:text-slate-200 text-base dark:placeholder:text-gray-400 placeholder:text-gray-600'
							placeholder='Полное имя'
							value={fullName}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setFullName(e.target.value)
								onChange(e.target.value)
							}}
							onBlur={onBlur}
							name={name}
							disabled={disabled}
							ref={ref}
						/>
					)}
				/>
			</div>
			<h3 className='font-bold text-xl py-2 mb-2 mt-3 dark:text-slate-100'>
				О себе
			</h3>
			<div className='p-2 border border-slate-600 rounded-lg'>
				<Controller
					control={control}
					name='bio'
					render={({ field: { onChange, ref, name, onBlur, disabled } }) => (
						<Input
							type='text'
							className='w-full p-1 bg-transparent dark:text-slate-200 text-base dark:placeholder:text-gray-400 placeholder:text-gray-600'
							placeholder='О себе'
							value={bio}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								onChange(e.target.value)
								setBio(e.target.value)
							}}
							onBlur={onBlur}
							name={name}
							disabled={disabled}
							ref={ref}
						/>
					)}
				/>
			</div>
			<div className='w-full py-3 flex justify-end'>
				<Button
					type='submit'
					disabled={updateInfo.isPending}
					className='mt-2 px-2 py-1.5'
				>
					Отправить
				</Button>
			</div>
		</form>
	)
}

const AccountEditPage = () => {
	const { user } = useUserStore()
	const { checkAuth } = useAuthStore()
	const fileInputRef = useRef<HTMLInputElement | null>(null)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
	const client = useQueryClient()
	const handleButtonClick = () => {
		fileInputRef.current?.click()
	}

	const deleteMe = useMutation({
		mutationKey: ['DELETE_ME'],
		mutationFn: () => UserService.deleteUser(),
		onError: () => {
			toast.error('Ошибка при удалении аккаунта')
		},
		onSuccess: () => {
			toast.success('Удаление аккаунта завершено')
			const time = setTimeout(() => {
				checkAuth()
			}, 1500)
			clearTimeout(time)
		},
	})
	const { mutateAsync } = useMutation({
		mutationKey: ['UPDATE_PROFILE'],
		mutationFn: (data: FormData) => UserService.setProfile(data),
	})

	const removeProfile = useMutation({
		mutationKey: ['DELETE_PROFILE'],
		mutationFn: (fileId: string) => UserService.deleteProfile(fileId),
		onError: () => {
			console.log(user)
		},
	})
	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0] || null
		if (!file) return

		const formData = new FormData()
		formData.append('file', file)
		toast.promise(mutateAsync(formData), {
			loading: 'Sending request...',
			error: 'Error occured.',
			success: 'Updated !',
		})
		setIsOpen(false)
		await client.refetchQueries({ queryKey: ['GET_USER'] })
	}

	const deleteProfileImg = async () => {
		if (user?.profileImg.type === 'edited') {
			if (user.profileImg.fileId) {
				await toast.promise(removeProfile.mutateAsync(user.profileImg.fileId), {
					loading: 'Sending request...',
					error: 'Error occured.',
					success: 'Deleted !',
				})
				setIsOpen(false)
				await client.refetchQueries({ queryKey: ['GET_USER'] })
			}
		}
	}

	if (isDialogOpen) {
		document.body.style.overflow = 'hidden'
	} else {
		document.body.style.overflow = 'auto'
	}

	return (
		<div className='container pt-4'>
			<AnimatePresence>
				{isDialogOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<Dialog
							head='Вы уверены, что удалите свой аккаунт?'
							body='Удалив свой аккаунт, вы потеряете все опубликованные вами сообщения.'
							onNo={() => setIsDialogOpen(false)}
							onYes={() => deleteMe.mutate()}
						></Dialog>
					</motion.div>
				)}
			</AnimatePresence>
			<div className='max-w-screen-md mx-auto mt-6 py-4'>
				<div className='w-full'>
					<div className='w-full flex items-center justify-between p-3 rounded-lg bg-gray-200 dark:bg-gray-600'>
						<div className='inline-flex'>
							<div className='sm:size-14 size-12 overflow-hidden rounded-full mr-2'>
								<img
									src={user?.profileImg.url}
									className='w-full h-full object-contain'
									alt=''
								/>
							</div>
							<div className='p-1'>
								<span className='text-sm font-bold dark:text-slate-100'>
									{user?.username}
								</span>
								<br />
								<span className='text-sm dark:text-slate-400'>
									{user?.fullName}
								</span>
							</div>
						</div>
						<Button onClick={() => setIsOpen(true)}>Новое фото</Button>
						<input
							type='file'
							ref={fileInputRef}
							style={{ display: 'none' }}
							onChange={handleFileChange}
							accept='image/*'
						/>
					</div>
					<ChangeInfoForm />
					{false && <ChangePasswordForm />}
					<AnimatePresence>
						{isOpen && (
							<motion.div>
								<Modal>
									<div className='p-4 rounded-lg bg-gray-800 dark:bg-dark flex flex-col'>
										<span
											className='py-2 px-3 text-blue-500 cursor-pointer hover:bg-gray-900'
											onClick={handleButtonClick}
										>
											Загрузить новое изображение
										</span>
										{user?.profileImg.type === 'edited' && (
											<span
												className='py-2 px-3 text-red-500 cursor-pointer hover:bg-gray-900'
												onClick={deleteProfileImg}
											>
												Удалить текущее изображение
											</span>
										)}
										<span
											onClick={() => setIsOpen(false)}
											className='py-2 px-3 cursor-pointer hover:bg-gray-900 text-center text-slate-100 hover:text-gray-300'
										>
											Отменить
										</span>
									</div>
								</Modal>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
				<div className='w-full'>
					<button
						className='w-full px-4 py-2 disabled:bg-red-400 text-white bg-red-500 rounded-md hover:bg-red-600'
						onClick={() => setIsDialogOpen(true)}
					>
						Удалить аккаунт
					</button>
				</div>
			</div>
		</div>
	)
}

export default AccountEditPage
