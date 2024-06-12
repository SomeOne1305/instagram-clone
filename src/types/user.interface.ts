export interface IUser {
	id: string
	fullName: string
	username: string
	profileImg: {
		url: string
		type: 'edited' | 'default'
		fileId: string
	}
	bio: string
	createdAt: string
	updatedAt: string
}
export interface IUserWithUsername extends IUser {
	posts: number
	followers: number
	followings: number
}

export interface IUpdateUser {
	fullName: string
	bio: string
}

export interface IResetPassword {
	prevPassword: string
	newPassword: string
}
