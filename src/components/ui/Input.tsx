import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../utils/cn'

type inputProps = InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, inputProps>(
	({ className, ...props }, ref) => {
		return (
			<input
				className={cn('p-1 text-sm outline-none', className)}
				{...props}
				ref={ref}
			/>
		)
	}
)

export default Input
