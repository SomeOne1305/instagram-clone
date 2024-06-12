import { motion } from 'framer-motion'
import logo from '../assets/logo.webp'
const Loading = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2 }}
			className='fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-light dark:bg-dark'
		>
			<img src={logo} className='w-24 h-24 object-cover' alt='' />
		</motion.div>
	)
}

export default Loading
