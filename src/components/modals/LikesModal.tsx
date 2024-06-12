import { useMutation, useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { UserService } from '../../services/User.service'
import { useUserStore } from '../../stores/useUserStore'
import { ILike } from '../../types/post.interface'
import { IUser } from '../../types/user.interface'
import { Button, Modal } from '../ui'

type Props = {
	data: ILike[]
	children: ReactNode
}

const LikesModal = ({ data, children }: Props) => {
	const { user } = useUserStore()
	const [followersMap, setFollowersMap] = useState<Record<string, boolean>>({})
	const followersQuery = useQuery<IUser[]>({
		queryKey: ['GET_USER_FOLLOWINGS'],
		queryFn: () => UserService.getFollowings(user?.id || ''),
		enabled: !!user,
	})

	const subscribe = useMutation({
		mutationKey: ['SUBSCRIBE'],
		mutationFn: (id: string) => UserService.follow(id),
		onSuccess: async () => await followersQuery.refetch(),
		onError: err => toast.error(err.message),
	})

	const unsubscribe = useMutation({
		mutationKey: ['SUBSCRIBE'],
		mutationFn: (id: string) => UserService.unfollow(id),
		onSuccess: async () => await followersQuery.refetch(),
		onError: err => toast.error(err.message),
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

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<Modal>
				<div className='max-w-sm flex flex-col bg-gray-800 rounded-lg'>
					<div className='w-full p-3 border-b border-gray-200'>{children}</div>
					<div className='w-full flex flex-col overflow-y-auto max-h-96 p-4'>
						{data?.map(item => (
							<div
								key={item.id}
								className='w-full flex items-center justify-between mt-1'
							>
								<div className='inline-flex items-center mr-2'>
									<div className='w-11 h-11'>
										<img
											src={item?.user?.profileImg?.url}
											className='w-full h-full rounded-full select-none'
											alt=''
										/>
									</div>
									<div className='py-1 px-1.5'>
										<Link
											to={'/' + item?.user?.username + '/'}
											className='text-slate-100 font-bold text-xs'
										>
											{item?.user?.username}
										</Link>
										<span className='text-xs text-gray-400 whitespace-nowrap line-clamp-1'>
											{item?.user?.fullName}
										</span>
									</div>
								</div>
								{item?.user?.id === user?.id ? (
									<span className='w-24 block'></span>
								) : followersMap[item?.user?.id] ? (
									<Button
										className='text-sm ml-2 bg-gray-600 hover:bg-gray-700'
										onClick={() => unsubscribe.mutate(item?.user?.id)}
									>
										Подписки
									</Button>
								) : (
									<Button
										className='text-sm ml-2'
										onClick={() => subscribe.mutate(item?.user?.id)}
									>
										Подписаться
									</Button>
								)}
							</div>
						))}
					</div>
				</div>
			</Modal>
		</motion.div>
	)
}

export default LikesModal
