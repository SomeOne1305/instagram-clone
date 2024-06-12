export interface ILogin {
	email: string
	password: string
}

export interface IRegister {
	email: string
	fullName: string
	username: string
	password: string
}

export interface ISendOTP {
	email: string
}

export interface IVerifyOTP {
	email: string
	code: string
}

export interface INewPass {
	email: string
	newPassword: string
	token: string
}
