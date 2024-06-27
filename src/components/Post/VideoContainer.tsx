import { AnimatePresence, motion } from 'framer-motion'
import { FC, useEffect, useRef, useState } from 'react'
import { FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'
import useMuteStateStore from '../../stores/useMuteStateStore'

const VideoContainer: FC<{ src: string; index: number }> = ({ src, index }) => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const [aspectRatio, setAspectRatio] = useState({ w: 16, h: 9 })
	const [isPlaying, setIsPlaying] = useState(false)
	const { isMuted, toggleMute } = useMuteStateStore()
	const { ref, inView } = useInView({
		threshold: index === 0 ? 1 : 0.5,
		rootMargin: '40px 0px',
	})

	useEffect(() => {
		const updateAspectRatio = () => {
			if (videoRef.current) {
				const video = videoRef.current
				const videoWidth = video.videoWidth
				const videoHeight = video.videoHeight
				const ratio = videoWidth / videoHeight

				if (videoHeight > videoWidth) {
					setAspectRatio({ w: 9, h: 16 })
				} else {
					setAspectRatio({ w: ratio, h: 1 })
				}
			}
		}

		videoRef.current?.addEventListener('loadedmetadata', updateAspectRatio)

		return () => {
			videoRef?.current?.removeEventListener(
				'loadedmetadata',
				updateAspectRatio
			)
		}
	}, [src])

	useEffect(() => {
		if (inView) {
			videoRef.current?.play()
			setIsPlaying(true)
		} else {
			videoRef.current?.pause()
			setIsPlaying(false)
		}
	}, [inView])

	useEffect(() => {
		const handleVideoEnd = () => {
			// Reset video playback to the beginning
			if (videoRef.current) {
				videoRef.current.pause()
				videoRef.current.currentTime = 0
				setIsPlaying(false)
			}
		}

		videoRef.current?.addEventListener('ended', handleVideoEnd)

		return () => {
			videoRef.current?.removeEventListener('ended', handleVideoEnd)
		}
	}, [])

	const handlePlayPause = () => {
		if (videoRef.current) {
			if (videoRef.current.paused) {
				videoRef.current.play()
				setIsPlaying(true)
			} else {
				videoRef.current.pause()
				setIsPlaying(false)
			}
		}
	}

	const handleMuteToggle = () => {
		toggleMute()
		if (videoRef.current) {
			videoRef.current.muted = !videoRef.current.muted
		}
	}

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.muted = isMuted
		}
	}, [isMuted])

	return (
		<div
			ref={ref}
			className='relative w-full max-w-full overflow-hidden rounded-md'
			style={{
				paddingTop: `${(aspectRatio.h / aspectRatio.w) * 70}%`,
				maxHeight: '640px',
				minHeight: '320px',
			}}
		>
			<video
				ref={videoRef}
				className='absolute top-0 left-0 w-full h-full object-cover object-center'
				controls={false}
				onClick={handlePlayPause}
			>
				<source src={src} type='video/mp4' />
				Your browser does not support the video tag.
			</video>
			<AnimatePresence>
				{!isPlaying || videoRef?.current?.ended ? (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='w-full h-full absolute top-0 left-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center'
						onClick={handlePlayPause}
					>
						<div className='p-3 rounded-full bg-gray-900 text-2xl'>
							<FaPlay className='text-slate-100' />
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
			<button
				onClick={handleMuteToggle}
				className='absolute bottom-4 right-4 text-white text-base bg-gray-950 bg-opacity-50 rounded-full p-2'
			>
				{isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
			</button>
		</div>
	)
}

export default VideoContainer
