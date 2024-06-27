import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa'
import { FaEllipsisVertical } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { PostService } from '../../services/Post.service'
import { useUserStore } from '../../stores/useUserStore'
import { IComment, ILike, IPost } from '../../types/post.interface'
import { getTimeDifference } from '../../utils/getTime'
import LikesModal from '../modals/LikesModal'
import { Modal } from '../ui'
import ImageContainer from './ImageContainer'
import SendComment from './SendComment'
import VideoContainer from './VideoContainer'

const PostCard = ({ data, index }: { data: IPost; index: number }) => {
	const [likesModal, setLikesModal] = useState<boolean>(false)
	const [commentsModal, setCommentsModal] = useState<boolean>(false)
	const [options, setOptions] = useState<boolean>(false)
	const { user } = useUserStore()

	if (likesModal || commentsModal) {
		document.body.style.overflow = 'hidden'
	} else {
		document.body.style.overflow = 'auto'
	}

	const client = useQueryClient()

	const comments = useQuery<IComment[]>({
		queryKey: ['GET_COMMENTS_' + data?.id],
		queryFn: () => PostService.getComments(data?.id),
	})

	const likes = useQuery<ILike[]>({
		queryKey: ['GET_LIKES', data?.id],
		queryFn: () => PostService.getLikes(data?.id),
	})

	const likeIt = useMutation({
		mutationKey: ['LIKE_IT', data.id],
		mutationFn: (id: string) => PostService.clickLike(id),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['GET_LIKES', data.id] })
		},
	})

	const disLikeIt = useMutation({
		mutationKey: ['DISLIKE_IT', data.id],
		mutationFn: (id: string) => PostService.disLike(id),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['GET_LIKES', data.id] })
		},
	})
	const commentDelete = useMutation({
		mutationKey: ['DELETE_COMMENT'],
		mutationFn: (id: string) => PostService.deleteComment(id),
	})

	const postDelete = useMutation({
		mutationKey: ['DELETE_POST'],
		mutationFn: (id: string) => PostService.deletePost(id),
	})

	const handleLike = async () => {
		await likeIt.mutateAsync(data.id)
		await likes.refetch()
	}

	const handleDislike = async () => {
		await disLikeIt.mutateAsync(data.id)
		await likes.refetch()
	}

	const deleteComment = async (id: string) => {
		await commentDelete.mutateAsync(id)
		await comments.refetch()
	}

	const deletePost = async () => {
		await postDelete.mutateAsync(data?.id)
		await client.refetchQueries({ queryKey: ['GET_POSTS'] })
	}
	return (
		<div className='w-full flex flex-col relative ' key={data?.id}>
			<AnimatePresence>
				{likesModal && likes.data && likes.data?.length > 0 && (
					<LikesModal data={likes.data}>
						<IoMdClose
							className='text-lg text-slate-200 cursor-pointer ml-auto'
							onClick={() => setLikesModal(false)}
						/>
					</LikesModal>
				)}
			</AnimatePresence>
			<div className='flex items-center my-2 py-1'>
				<div className='w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-gray-600 overflow-hidden'>
					<img
						src={data?.user.profileImg.url}
						className='h-full w-full aspect-auto'
						alt=''
					/>
				</div>
				<span className='text-sm ml-2'>
					<Link
						to={`/${data?.user?.username}/`}
						className='text-base font-bold dark:text-slate-200'
					>
						{data?.user.username}
					</Link>
				</span>
				<span className='text-gray-700 ml-1 max-sm:text-sm'>
					• {getTimeDifference(data.createdAt)}
				</span>

				{data?.user?.id == user?.id && (
					<div className='p-1 relative ml-auto'>
						<FaEllipsisVertical
							className='text-2xl dark:text-slate-100 cursor-pointer'
							onClick={() => setOptions(prev => !prev)}
						/>
						{options && (
							<div className='absolute top-[100%] right-1 bg-gray-900 rounded z-10 p-1'>
								<div
									className='py-1.5 px-2 rounded cursor-pointer flex items-center text-red-600 hover:bg-gray-800'
									onClick={deletePost}
								>
									<span className='text-base mr-1 select-none'>Удалить</span>
									<RiDeleteBin5Line className='text-lg' />
								</div>
							</div>
						)}
					</div>
				)}
			</div>
			<div className='w-full'>
				{data.post_data.type == 'video' && (
					<VideoContainer src={data.post_data.url} index={index} />
				)}
				{data.post_data.type == 'image' && (
					<ImageContainer src={data.post_data.url} />
				)}
			</div>
			<div className='w-full flex items-center mt-4'>
				<motion.button whileTap={{ scale: 0.9 }} className='focus:outline-none'>
					<AnimatePresence>
						{likes.data?.find(e => e.user.id == user?.id) ? (
							<motion.div
								initial={{ scale: 1 }}
								animate={{
									scale: likes.data?.find(e => e.user.id == user?.id)
										? [1, 1.3, 1]
										: 1,
								}}
								transition={{ duration: 0.3 }}
								className='text-red-500'
								onClick={handleDislike}
							>
								<FaHeart className={`text-3xl `} />
							</motion.div>
						) : (
							<motion.div
								initial={{ scale: 1 }}
								animate={{
									scale: likes.data?.find(e => e.user.id == user?.id)
										? [1, 1.3, 1]
										: 1,
								}}
								transition={{ duration: 0.3 }}
								className='text-black hover:text-slate-800 dark:text-slate-200'
								onClick={handleLike}
							>
								<FaRegHeart className={`text-3xl`} />
							</motion.div>
						)}
					</AnimatePresence>
				</motion.button>
				<div
					className='cursor-pointer ml-3'
					onClick={() => setCommentsModal(true)}
				>
					<FaRegComment className='text-3xl text-black dark:text-slate-100 hover:text-slate-800' />
				</div>
			</div>
			<div className='w-full py-2'>
				<span
					className='text-sm font-bold cursor-pointer dark:text-slate-200'
					onClick={() => setLikesModal(true)}
				>
					{likes.isLoading ? '...' : likes.data?.length} отметок "Нравится"
				</span>
				<p className='text-sm line-clamp-2 dark:text-slate-200'>
					<a href='#' className='font-bold mr-1'>
						{data.user.username}:
					</a>
					{data.post_caption}
				</p>
				<span
					className='text-sm hover:underline cursor-pointer text-gray-700 dark:text-gray-400'
					onClick={() => setCommentsModal(true)}
				>
					Посмотреть все комментарии (
					{comments.isLoading ? '...' : comments.data?.length})
				</span>
				<SendComment postId={data.id} />
			</div>
			<AnimatePresence>
				{commentsModal && (
					<Modal>
						<div className='max-w-screen-sm w-full bg-gray-900 rounded-md'>
							<div className='w-full py-3'>
								<IoMdClose
									className='text-xl mr-2 text-slate-100 cursor-pointer ml-auto'
									onClick={() => setCommentsModal(false)}
								/>
							</div>
							<div className='w-full p-2 flex items-center border-b border-gray-400 gap-1'>
								<div className='w-10 h-10 block'>
									<img
										src={data?.user?.profileImg?.url}
										alt=''
										className='w-full h-full object-cover rounded-full'
									/>
								</div>
								<p className='w-full p-2 text-sm text-gray-300'>
									<a href='#' className='font-bold mr-1 text-slate-100'>
										{data?.user?.username} :
									</a>
									{data?.post_caption}
								</p>
							</div>
							<p className='p-2'>
								<h2 className='font-semibold text-slate-100'>Comments:</h2>
							</p>
							<div className='w-full h-[60vh] flex flex-col justify-between'>
								<div className='w-full h-full overflow-y-auto'>
									{comments.data?.map(comment => (
										<div
											className='w-full p-2 flex items-start'
											key={comment.id}
										>
											<div className='w-10 h-10'>
												<img
													src={comment?.user?.profileImg?.url}
													alt=''
													className='w-10 h-full rounded-full'
												/>
											</div>
											<p className='w-full m-1 mt-0 pt-0 p-2 text-sm text-gray-300 block'>
												<a href='#' className='font-bold mr-1 text-slate-100'>
													{comment?.user?.username} :
												</a>
												{comment?.text}

												<p className='w-full mt-1'>
													<span className='text-sm text-gray-400 mr-4'>
														{getTimeDifference(comment?.createdAt)}
													</span>

													{comment.user?.id === user?.id && (
														<span
															className='text-sm text-red-600 cursor-pointer p-0.5'
															onClick={() => deleteComment(comment?.id)}
														>
															Удалить
														</span>
													)}
												</p>
											</p>
										</div>
									))}
								</div>
								<div className='w-full p-2 border-t border-t-gray-400'>
									<SendComment postId={data?.id} />
								</div>
							</div>
						</div>
					</Modal>
				)}
			</AnimatePresence>
		</div>
	)
}

export default PostCard
