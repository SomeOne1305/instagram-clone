import React from 'react'
import { cn } from '../../utils/cn'

type buttonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

function Button({ className, ...props }: buttonProps) {
	return (
		<button
			{...props}
			className={cn(
				'bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white py-1 px-1.5 rounded-lg',
				className
			)}
		/>
	)
}

export default Button
