import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<div className='w-full h-screen text-center'>
			<h2 className='text-2xl lg:text-3xl font-medium dark:text-slate-100 mt-16'>
				К сожалению, эта страница недоступна.
			</h2>
			<p className='text-lg mt-3 dark:text-slate-100'>
				Возможно, вы воспользовались недействительной ссылкой или страница была
				удалена.{' '}
				<Link to={'/'} className='text-blue-500'>
					Назад в Instagram.
				</Link>
			</p>
		</div>
	)
}

export default NotFound
