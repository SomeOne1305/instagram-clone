import { IComment, IGetPost, IWriteComment } from '../types/post.interface'
import { API } from './api'

export const PostService = {
	async create(data: FormData) {
		return (
			await API.post('posts/create', data, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
		).data
	},
	async getAll(page: number | unknown) {
		return (
			await API.get<IGetPost>('posts/all', {
				params: { page, limit: 3 },
			})
		).data
	},
	async getComments(postID: string) {
		return (await API.get<IComment[]>('comments/' + postID)).data
	},
	async getLikes(postID: string) {
		return (await API.get('likes/' + postID)).data
	},
	async clickLike(postID: string) {
		return (await API.post('likes/' + postID)).data
	},
	async disLike(postID: string) {
		return (await API.delete('likes/' + postID)).data
	},
	async writeComment(postId: string, data: IWriteComment) {
		return (await API.post<IWriteComment>('comments/write/' + postId, data))
			.data
	},
	async deleteComment(commentID: string) {
		return (await API.delete('comments/' + commentID)).data
	},
	async deletePost(postID: string) {
		return (await API.delete('posts/delete/' + postID)).data
	},
}
