import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BsGrid3X3 } from 'react-icons/bs'
import { FaHeart, FaRegImage } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { IoChatbubble, IoSettingsSharp } from 'react-icons/io5'
import { LuBadgeInfo } from 'react-icons/lu'
import { MdOutlineCameraAlt, MdOutlineVideoLibrary } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import SEO from '../components/SEO'
import UserModal from '../components/modals/UserModal'
import { Button } from '../components/ui'
import { structuredData } from '../constants/structuredSeo'
import { UserService } from '../services/User.service'
import { useUserStore } from '../stores/useUserStore'
import { IFullPost } from '../types/post.interface'
import { IUser, IUserWithUsername } from '../types/user.interface'

const UserPosts = ({ userId }: { userId: string }) => {
	const { data } = useQuery<IFullPost[]>({
		queryKey: ['GET_USER_POSTS', userId],
		queryFn: () => UserService.getUserPosts(userId),
	})

	return (
		<div className='w-full mt-4 border-t border-gray-800 dark:border-gray-400'>
			<div className='w-full flex items-start'>
				<div className='px-2 py-1 my-5 inline-flex items-center text-slate-100 cursor-pointer'>
					<BsGrid3X3 className='text-lg mr-2' />
					<span className='text-base'>ПУБЛИКАЦИИ :</span>
				</div>
			</div>
			<div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-1 py-3'>
				{data &&
					data?.length > 0 &&
					data?.map(post => (
						<div
							key={post.id}
							className='flex relative max-h-72 group cursor-pointer border dark:border-gray-800 border-gray-400'
							onClick={() =>
								toast('previewing post is not available yet', {
									icon: <LuBadgeInfo className='text-2xl text-blue-500' />,
								})
							}
						>
							{post?.post_data?.type === 'video' ? (
								<>
									<video
										src={post?.post_data?.url}
										className='w-full h-full object-cover'
									></video>
									<div className='absolute top-0 right-0 p-2 z-10'>
										<MdOutlineVideoLibrary className='text-2xl dark:text-slate-100 text-gray-800' />
									</div>
								</>
							) : (
								<>
									<img
										src={post?.post_data?.url}
										alt=''
										className='w-full h-full object-cover'
									/>
									<div className='absolute top-0 right-0 p-2 z-10'>
										<FaRegImage className='text-2xl dark:text-slate-100 text-gray-800' />
									</div>
								</>
							)}
							<div className='opacity-0 group-hover:opacity-100 transition-opacity duration-75 absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center'>
								<div className='inline-flex items-center text-white mr-3'>
									<FaHeart className='text-xl mr-1' />
									<span className='text-base'>{post.likes}</span>
								</div>
								<div className='inline-flex items-center text-white mr-3'>
									<IoChatbubble className='text-xl mr-1' />
									<span className='text-base'>{post.comments}</span>
								</div>
							</div>
						</div>
					))}
			</div>
			{data && data.length == 0 && (
				<div className='w-full py-2'>
					<div className='w-full flex flex-col items-center mx-auto mt-2'>
						<div className='size-16 border-2 border-black rounded-full dark:border-slate-100 flex items-center justify-center mx-auto'>
							<MdOutlineCameraAlt className='text-2xl dark:text-slate-100' />
						</div>
						<span className='text-2xl font-medium dark:text-slate-100 mt-3'>
							Публикаций пока нет
						</span>
					</div>
				</div>
			)}
		</div>
	)
}

const UserPage = () => {
	const { username } = useParams<{ username: string }>()
	const [followersMap, setFollowersMap] = useState<Record<string, boolean>>({})
	const [modalType, setModalType] = useState<'followers' | 'followings' | ''>(
		''
	)

	const { user } = useUserStore()

	const userWithUsername = useQuery<IUserWithUsername, AxiosError>({
		queryKey: ['GET_USER_BY_USERNAME', username],
		queryFn: async () => {
			if (!username) {
				throw new Error('Username is required')
			}
			return await UserService.getUserByUserName(username)
		},
	})

	const followersQuery = useQuery<IUser[]>({
		queryKey: ['GET_USER_FOLLOWERS'],
		queryFn: () => UserService.getFollowers(user?.id || ''),
		enabled: !!user,
	})
	useEffect(() => {
		if (followersQuery.isSuccess && followersQuery.data) {
			const followerIds = followersQuery.data.map(follower => follower.id)
			const followerMap: Record<string, boolean> = {}
			followerIds.forEach(id => {
				followerMap[id] = true
			})
			setFollowersMap(followerMap)
		}
	}, [followersQuery.isSuccess, followersQuery.data])
	const followersOrFollowings = useQuery<IUser[]>({
		queryKey: [
			'GET_USER_FOLLOWER_OR_FOLLOWINGS',
			modalType,
			userWithUsername.data?.id,
		],
		queryFn: async () => {
			if (!userWithUsername.data) {
				throw new Error('User is not coming...')
			}
			if (modalType === 'followers' && userWithUsername.data.id) {
				return await UserService.getFollowers(userWithUsername.data.id)
			} else if (modalType === 'followings' && userWithUsername.data.id) {
				return await UserService.getFollowings(userWithUsername.data.id)
			} else {
				return []
			}
		},
		enabled: !!userWithUsername.data && !!modalType, // Ensure the query is enabled only when data is available
	})

	useEffect(() => {
		setModalType('')
	}, [username])

	const isFollower =
		userWithUsername.data &&
		userWithUsername.data.id &&
		followersMap[userWithUsername.data.id]

	return (
		<div className='container'>
			<SEO
				title={`@${username} | Instagram`}
				description='This is the login page of my website.'
				keywords='login, awesome website,instagram, instagram-clone, github, insta clone, instagram project, instagram clone react js'
				author='Kholmuminov Ahmadullo'
				ogUrl='https://example.com/'
				ogImage='https://example.com/image.jpg'
				twitterCard='summary_large_image'
				twitterCreator='@yourtwitterhandle'
				structuredData={structuredData}
			/>
			<div className='max-w-[936px] mx-auto mt-7 pt-6'>
				{modalType === 'followers' && followersOrFollowings.data && (
					<UserModal data={followersOrFollowings.data} query={userWithUsername}>
						<IoMdClose
							className='text-lg text-slate-200 cursor-pointer ml-auto'
							onClick={() => setModalType('')}
						/>
					</UserModal>
				)}
				{modalType === 'followings' && followersOrFollowings.data && (
					<UserModal data={followersOrFollowings.data} query={userWithUsername}>
						<IoMdClose
							className='text-lg text-slate-200 cursor-pointer ml-auto'
							onClick={() => setModalType('')}
						/>
					</UserModal>
				)}
				<div className='w-full flex items-start justify-between'>
					<div className='lg:size-40 size-20 rounded-full overflow-hidden border-4 border-gray-300 dark:border-gray-800 p-1'>
						<img
							src={userWithUsername.data?.profileImg?.url}
							alt=''
							className='w-full h-full rounded-full object-cover'
						/>
					</div>
					<div className='w-4/5 flex flex-col p-3'>
						<div className='flex items-center gap-4'>
							<span className='text-xl font-semibold dark:text-slate-100 mr-3'>
								{username}
							</span>
							{username === user?.username ? (
								<Link
									to={'/account/edit'}
									className='bg-gray-600 hover:bg-gray-500 text-white py-1.5 px-2 rounded-lg inline-flex items-center ml-2'
								>
									<span className='lg:block hidden'>Редактировать профиль</span>
									<IoSettingsSharp className='lg:text-lg text-xl lg:ml-1' />
								</Link>
							) : isFollower ? (
								<Button className='py-1.5 px-2 bg-gray-600 hover:bg-gray-700'>
									Подписки
								</Button>
							) : (
								<Button className='py-1.5 px-2'>Подписаться</Button>
							)}
						</div>
						<div className='flex items-center flex-wrap gap-6 mt-6'>
							<span className='text-lg dark:text-slate-100'>
								<b>{userWithUsername?.data?.posts}</b> публикаций
							</span>
							<span
								className='text-lg dark:text-slate-100 cursor-pointer'
								onClick={() => setModalType('followers')}
							>
								<b>{userWithUsername.data?.followers}</b> подписчиков
							</span>
							<span
								className='text-lg dark:text-slate-100 cursor-pointer'
								onClick={() => setModalType('followings')}
							>
								<b>{userWithUsername.data?.followings}</b> подписок
							</span>
						</div>
						<span className='text-base font-bold mt-4 mb-2 dark:text-slate-100'>
							{userWithUsername.data?.fullName}
						</span>
						<div className='py-3'>
							<p className='text-base dark:text-slate-100'>
								{userWithUsername.data?.bio}
							</p>
						</div>
					</div>
				</div>
				{userWithUsername.data?.id && (
					<UserPosts userId={userWithUsername.data?.id} />
				)}
			</div>
		</div>
	)
}

export default UserPage
