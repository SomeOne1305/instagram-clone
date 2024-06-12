import { Link } from 'react-router-dom'
import { cn } from '../utils/cn'

const Logo = ({
	type,
	className,
}: {
	type: 'url' | 'img'
	className?: string
}) => {
	switch (type) {
		case 'url':
			return (
				<Link to={'/'} className='inline-flex'>
					<h1
						className={cn(
							'text-5xl font-satisfy font-medium select-none',
							className
						)}
					>
						Instagram
					</h1>
				</Link>
			)
		case 'img':
			return (
				<h1
					className={cn(
						'text-5xl font-satisfy font-medium select-none',
						className
					)}
				>
					Instagram
				</h1>
			)
		default:
			return (
				<h1
					className={cn(
						'text-5xl font-satisfy font-medium select-none',
						className
					)}
				>
					Instagram
				</h1>
			)
	}
}

export default Logo
