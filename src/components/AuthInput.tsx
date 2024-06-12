import React from 'react'
import '../css/AuthInput.css'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
	label: string
}

const AuthInput = React.forwardRef<HTMLInputElement, Props>(
	({ type, id, label, ...props }, ref) => {
		return (
			<label
				htmlFor={id}
				className='bg-gray-50 dark:bg-transparent border border-gray-300 dark:border-gray-600 rounded-md p-0.5 pt-1.5 relative label mt-2 invalid:border-red-500 w-full'
			>
				<input
					type={type}
					id={id}
					ref={ref}
					{...props}
					className='bg-transparent dark:bg-transparent dark:text-slate-100 p-1.5 text-sm mt-1.5 outline-none w-full h-full peer'
					placeholder=' '
				/>
				<span className='absolute left-2 top-2.5 peer-focus:top-1 peer-focus:text-xs text-sm text-gray-500 dark:text-gray-400 transition-all duration-75 select-none'>
					{label}
				</span>
			</label>
		)
	}
)

export default AuthInput
