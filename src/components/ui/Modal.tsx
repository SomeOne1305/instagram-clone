import React from 'react'
type modalProps = React.HTMLAttributes<HTMLDivElement>
const Modal = (props: modalProps): JSX.Element => {
	return (
		<div
			className='w-full h-full fixed top-0 left-0 z-20 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4'
			{...props}
		/>
	)
}

export default Modal
