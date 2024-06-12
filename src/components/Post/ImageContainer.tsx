import { FC, useEffect, useRef, useState } from 'react'

const ImageContainer: FC<{ src: string }> = ({ src }) => {
	const imgRef = useRef<HTMLImageElement>(null)
	const [aspectRatio, setAspectRatio] = useState({ w: 1, h: 1 })

	useEffect(() => {
		const updateAspectRatio = () => {
			if (imgRef.current) {
				const img = imgRef.current
				const ratio = img.naturalWidth / img.naturalHeight
				setAspectRatio({
					w: ratio,
					h: 1,
				})
			}
		}

		if (imgRef.current?.complete) {
			updateAspectRatio()
		} else {
			imgRef.current?.addEventListener('load', updateAspectRatio)
		}

		return () => {
			imgRef.current?.removeEventListener('load', updateAspectRatio)
		}
	}, [src])

	return (
		<div
			className='relative w-full max-w-full overflow-hidden rounded-md border border-gray-400 mb-3'
			style={{ paddingTop: `${(aspectRatio.h / aspectRatio.w) * 100}%` }}
		>
			<img
				ref={imgRef}
				src={src}
				alt=''
				className='absolute top-0 border-none p-1 left-0 w-full h-full object-cover'
			/>
		</div>
	)
}

export default ImageContainer
