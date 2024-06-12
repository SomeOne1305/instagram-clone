export interface IError {
	statusCode: number
	message: string
	details?: {
		message: string | string[]
		error: string | string[]
		statusCode: number
	}
	timestamp: string
	path: string
}
