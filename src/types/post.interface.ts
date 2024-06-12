import { IUser } from './user.interface'

export interface IPost {
	id: string
	post_data: {
		url: string
		type: 'image' | 'video'
		fileId: string
	}
	post_caption: string
	createdAt: string
	updatedAt: string
	user: IUser
}

export interface IGetPost {
	posts: IPost[]
	total: number
}

export interface IFullPost {
	id: string
	post_data: {
		url: string
		type: 'image' | 'video'
		fileId: string
	}
	post_caption: string
	createdAt: string
	updatedAt: string
	likes: number
	comments: number
}

export interface IComment {
	id: string
	text: string
	createdAt: string
	updatedAt: string
	user: IUser
}

export interface IWriteComment {
	text: string
}

export interface ILike {
	id: string
	createdAt: string
	user: IUser
}
