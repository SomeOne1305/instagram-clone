import React from 'react'

interface DialogProps {
	head: string
	body: string
	onYes: () => void
	onNo: () => void
}

const Dialog: React.FC<DialogProps> = ({ head, body, onYes, onNo }) => {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-65 backdrop-blur-sm'>
			<div className='bg-dark rounded-lg p-6 max-w-sm w-full'>
				<h2 className='text-lg font-bold mb-4 text-slate-100'>{head}</h2>
				<p className='mb-4 text-gray-200'>{body}</p>
				<div className='flex justify-end'>
					<button
						className='bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mr-2'
						onClick={onNo}
					>
						No
					</button>
					<button
						className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
						onClick={onYes}
					>
						Yes
					</button>
				</div>
			</div>
		</div>
	)
}

export default Dialog
