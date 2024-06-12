import { AnimatePresence, motion } from 'framer-motion'
import { LuMoon, LuSun } from 'react-icons/lu'
import useThemeStore from '../../stores/useThemeStore'

const ThemeSwitch = () => {
	const { theme, setTheme } = useThemeStore()

	const variants = {
		initial: { rotate: -90, opacity: 0 },
		animate: { rotate: 0, opacity: 1 },
		exit: { rotate: 90, opacity: 0 },
	}
	return (
		<div className='relative w-7 h-7'>
			<AnimatePresence mode='popLayout' key={'theme-switch'}>
				{theme === 'dark' ? (
					<motion.div
						key='sun'
						initial='initial'
						animate='animate'
						exit='exit'
						variants={variants}
						transition={{ duration: 0.5 }}
						className='absolute inset-0 flex items-center justify-center cursor-pointer'
						onClick={() => setTheme('light')}
					>
						<LuSun className='text-2xl' />
					</motion.div>
				) : (
					<motion.div
						key='moon'
						initial='initial'
						animate='animate'
						exit='exit'
						variants={variants}
						transition={{ duration: 0.5 }}
						className='absolute inset-0 flex items-center justify-center cursor-pointer'
						onClick={() => setTheme('dark')}
					>
						<LuMoon className='text-2xl' />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default ThemeSwitch
