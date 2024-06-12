import { useMutation, useQueryClient } from '@tanstack/react-query'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { motion } from 'framer-motion'
import React, { ChangeEvent, useState } from 'react'
import { FaRegSmile } from 'react-icons/fa'
import { PostService } from '../../services/Post.service'
import useThemeStore from '../../stores/useThemeStore'
import { IWriteComment } from '../../types/post.interface'

interface SendCommentProps {
	postId: string
}

enum Theme {
	DARK = 'dark',
	LIGHT = 'light',
	AUTO = 'auto',
}

const SendComment: React.FC<SendCommentProps> = ({ postId }) => {
	const { theme } = useThemeStore()

	const [comment, setComment] = useState<string>('')
	const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false)

	const handleEmojiClick = (emojiObject: EmojiClickData) => {
		setComment(prev => prev + emojiObject.emoji)
	}

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setComment(e.target.value)
	}

	const client = useQueryClient()
	const writeComment = useMutation({
		mutationKey: ['WRITE_COMMENT', postId],
		mutationFn: (data: { id: string; comment: IWriteComment }) =>
			PostService.writeComment(data.id, data.comment),
		onSuccess: async () => {
			setComment('')
			await client.refetchQueries({ queryKey: ['GET_COMMENTS_' + postId] })
		},
	})

	const handleComment = async () => {
		if (!comment.trim()) return
		const commentData = {
			id: postId,
			comment: {
				text: comment,
			},
		}
		await writeComment.mutateAsync(commentData)
	}

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleComment()
		}
	}

	return (
		<div className='w-full flex items-center justify-between py-2 border-b border-b-gray-700 relative'>
			<input
				type='text'
				placeholder='Добавить комментарий'
				className='text-sm outline-none border-none bg-transparent placeholder:text-gray-500 text-black w-full dark:text-slate-100'
				value={comment}
				onChange={handleInputChange}
				onKeyPress={handleKeyPress}
			/>
			<motion.span
				className='text-base text-blue-600 font-bold ml-2 cursor-pointer'
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{
					opacity: comment.length > 0 ? 1 : 0,
				}}
				transition={{ duration: 0.3 }}
				onClick={handleComment}
			>
				Публиковать
			</motion.span>
			<div className='p-1 relative'>
				<FaRegSmile
					className='text-lg cursor-pointer dark:text-slate-100'
					onClick={() => setShowEmojiPicker(!showEmojiPicker)}
				/>
				{showEmojiPicker && (
					<div className='absolute bottom-10 right-0 z-10'>
						<EmojiPicker
							theme={theme === Theme.DARK ? Theme.DARK : Theme.LIGHT}
							onEmojiClick={handleEmojiClick}
						/>
					</div>
				)}
			</div>
		</div>
	)
}

export default SendComment
