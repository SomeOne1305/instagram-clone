import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import React, { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { CgAddR } from 'react-icons/cg'
import { FaRegUser, FaUser } from 'react-icons/fa'
import { GoHome, GoHomeFill } from 'react-icons/go'
import { IoIosImages, IoMdExit } from 'react-icons/io'
import { MdOutlinePermMedia } from 'react-icons/md'
import { RiSearchFill, RiSearchLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { AuthService } from '../../services/Auth.service'
import { API } from '../../services/api'
import { useAuthStore } from '../../stores/useAuthStore'
import { useUserStore } from '../../stores/useUserStore'
import Logo from '../Logo'
import { Button, Modal } from '../ui'
import ThemeSwitch from './ThemeSwitch'

const Navbar: React.FC = () => {
	const { user } = useUserStore()
	const { checkAuth } = useAuthStore()
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [progress, setProgress] = useState<number>(0)
	const [previewSrc, setPreviewSrc] = useState<string>('')
	const [file, setFile] = useState<File | null>(null)
	const [caption, setCaption] = useState<string>('')

	const handleModalToggle = () => {
		setIsModalOpen(!isModalOpen)
		setPreviewSrc('')
		setFile(null)
		setCaption('')
	}

	const logout = useMutation({
		mutationKey: ['LOGOUT'],
		mutationFn: () => AuthService.logout(),
		onError: err => toast.error(err.message),
		onSuccess: () => {
			toast.success('Вы вышли из аккаунта')
			checkAuth()
		},
	})

	const postMutation = useMutation({
		mutationKey: ['PUBLISH_POST'],
		mutationFn: (data: FormData) => {
			return API.post('posts/create', data, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: progressEvent => {
					if (progressEvent.total) {
						const percentCompleted = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total
						)
						setProgress(percentCompleted <= 85 ? percentCompleted : 85) // Cap the progress at 85%
					}
				},
			})
		},
		onSuccess: () => {
			setProgress(100) // Set progress to 100% on success
		},
		onSettled: () => {
			setProgress(36)
		},
	})

	const client = useQueryClient()

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (!file) {
			alert('Please select a file')
			return
		}

		const formData = new FormData()
		formData.append('post_data', file)
		formData.append('post_caption', caption)

		setIsModalOpen(false)
		await toast.promise(postMutation.mutateAsync(formData), {
			success: 'Published!',
			error: 'Something went wrong!',
			loading: (
				<div className='inline-flex items-center'>
					<span className='text-sm mr-1'>{progress}%</span>
					<div className='w-32 h-1.5 bg-gray-200 rounded'>
						<div
							style={{
								width: `${progress}%`,
								transition: 'all',
								transitionDuration: '1000s',
								transitionBehavior: 'normal',
							}}
							className='h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded'
						></div>
					</div>
				</div>
			),
		})
		await client.refetchQueries({ queryKey: ['GET_POSTS'] })
		// Close the modal and reset the form
		handleModalToggle()
	}

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0]
		if (selectedFile && selectedFile.size < 20 * 1024 * 1024) {
			// less than 20MB
			setPreviewSrc(URL.createObjectURL(selectedFile))
			setFile(selectedFile)
		} else {
			alert('File must be less than 20MB')
		}
	}

	return (
		<div className='w-full fixed top-0 left-0 py-1 sm:py-3 border-b border-gray-300 bg-light dark:bg-dark dark:border-gray-600 z-20'>
			<div className='container'>
				<AnimatePresence>
					{isModalOpen && (
						<motion.div
							initial={{ opacity: 0, y: -50 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -50 }}
							transition={{ duration: 0.3 }}
						>
							<Modal>
								<form
									className='max-w-sm flex flex-col rounded-lg bg-dark p-4'
									onSubmit={onSubmit}
									id='publish-post'
								>
									<h3 className='text-xl inline-flex items-center py-3 text-slate-100 my-4 border-b border-gray-600'>
										<MdOutlinePermMedia className='text-xl mr-1.5' />
										Новый пост
									</h3>
									<div className='w-full max-h-96 rounded-md overflow-hidden'>
										{file && file.type.startsWith('video/') ? (
											<video controls className='w-full object-cover'>
												<source src={previewSrc} type={file.type} />
												Your browser does not support the video tag.
											</video>
										) : (
											<img
												src={previewSrc}
												alt=''
												className='w-full object-cover'
											/>
										)}
										{!file && (
											<>
												<input
													id='file-input'
													type='file'
													accept='image/*,video/*'
													style={{ display: 'none' }}
													onChange={handleFileChange}
												/>
												<label
													htmlFor='file-input'
													className='border border-gray-400 rounded-lg border-dashed flex items-center justify-center flex-col w-80 h-72'
												>
													<IoIosImages className='text-5xl text-gray-100' />
													<span className='text-base mt-1 text-gray-400'>
														Select video or image
													</span>
												</label>
											</>
										)}
									</div>
									<div className='w-full'>
										<textarea
											className='w-full outline-none border-b-2 border-gray-400 bg-transparent placeholder:text-gray-400 p-1 text-slate-100 mt-2 max-h-28 min-h-10'
											placeholder='Caption'
											value={caption}
											onChange={e => setCaption(e.target.value)}
											required
										></textarea>
									</div>
									<div className='w-full flex items-center justify-end mt-4'>
										<Button
											type='reset'
											className='bg-red-400 bg-opacity-50 hover:bg-red-400 hover:bg-opacity-60'
											onClick={handleModalToggle}
										>
											Отменить
										</Button>
										<Button type='submit' className='ml-2'>
											Публиковать
										</Button>
									</div>
								</form>
							</Modal>
						</motion.div>
					)}
				</AnimatePresence>
				<div className='w-full flex items-center justify-between'>
					<Logo
						type='url'
						className='text-3xl font-lobster dark:text-slate-100'
					/>
					<div className='sm:inline-flex items-center hidden'>
						<NavLink
							to={'/'}
							className={({ isActive }) =>
								`${isActive ? 'active' : ''} relative group dark:text-slate-100`
							}
						>
							<GoHome className='text-3xl group-[.active]:hidden block' />
							<GoHomeFill className='text-3xl group-[.active]:block hidden' />
						</NavLink>

						<NavLink
							to={`/${user?.username}/`}
							className={({ isActive }) =>
								`${
									isActive ? 'active' : ''
								} relative group ml-5 dark:text-slate-100`
							}
						>
							<FaRegUser className='text-2xl group-[.active]:hidden block' />
							<FaUser className='text-2xl group-[.active]:block hidden' />
						</NavLink>
						<NavLink
							to={'/search'}
							className={({ isActive }) => {
								return `${
									isActive ? 'active' : ''
								} relative group ml-5 dark:text-slate-100`
							}}
						>
							<RiSearchLine className='text-2xl group-[.active]:hidden block' />
							<RiSearchFill className='text-2xl group-[.active]:block hidden' />
						</NavLink>
						<button
							className='ml-5 dark:text-slate-100'
							title='New post'
							onClick={handleModalToggle}
						>
							<CgAddR className='text-3xl' />
						</button>
						<button
							className='ml-5 dark:text-slate-100 text-3xl'
							onClick={() => logout.mutate()}
						>
							<IoMdExit />
						</button>
					</div>
					<div className='w-full sm:hidden fixed bottom-0 left-0 bg-light border-t border-gray-300 dark:bg-dark dark:border-gray-700 flex items-center justify-evenly py-1 px-1.5'>
						<NavLink
							to={'/'}
							className={({ isActive }) =>
								`${isActive ? 'active' : ''} relative group dark:text-slate-100`
							}
						>
							<GoHome className='text-3xl group-[.active]:hidden block' />
							<GoHomeFill className='text-3xl group-[.active]:block hidden' />
						</NavLink>

						<NavLink
							to={'/search'}
							className={({ isActive }) => {
								return `${
									isActive ? 'active' : ''
								} relative group ml-5 dark:text-slate-100`
							}}
						>
							<RiSearchLine className='text-2xl group-[.active]:hidden block' />
							<RiSearchFill className='text-2xl group-[.active]:block hidden' />
						</NavLink>
						<button
							className='ml-5 dark:text-slate-100'
							title='New post'
							onClick={handleModalToggle}
						>
							<CgAddR className='text-3xl' />
						</button>
						<NavLink
							to={`/${user?.username}/`}
							className={({ isActive }) =>
								`${
									isActive ? 'active' : ''
								} relative group ml-5 dark:text-slate-100`
							}
						>
							<FaRegUser className='text-2xl group-[.active]:hidden block' />
							<FaUser className='text-2xl group-[.active]:block hidden' />
						</NavLink>
						<button
							className='ml-5 dark:text-slate-100 text-3xl'
							onClick={() => logout.mutate()}
						>
							<IoMdExit />
						</button>
					</div>
					<div className='p-1 hover:bg-gray-100 dark:hover:bg-slate-900 dark:text-slate-100 transition-colors duration-100 rounded-md'>
						<ThemeSwitch />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Navbar
