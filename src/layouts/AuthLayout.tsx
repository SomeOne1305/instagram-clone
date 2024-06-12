import { Outlet } from 'react-router-dom'
import { footerLinks } from '../constants/footerData'

const AuthLayout = () => {
	return (
		<div className='w-full h-full'>
			<div className='container h-screen'>
				<div className='w-full h-full flex items-center flex-col justify-between'>
					<div className='max-w-sm w-full mx-auto  mt-14'>
						<Outlet />
						<div className='w-full text-center mt-4'>
							<span className='text-sm dark:text-slate-100'>
								Получить приложение.{' '}
							</span>
						</div>
						<div className='flex items-center p-3'>
							<a
								href='https://apps.apple.com/ru/app/instagram/id389801252'
								className='w-1/2 p-2'
								target='_blank'
							>
								<img
									src='https://static.cdninstagram.com/rsrc.php/v3/yt/r/Yfc020c87j0.png'
									className='w-full h-12 object-cover'
									alt=''
								/>
							</a>
							<a
								href='https://play.google.com/store/apps/details?id=com.instagram.android&pcampaignid=web_share'
								className='w-1/2 p-2'
								target='_blank'
							>
								<img
									src='https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png'
									className='w-full h-12 object-cover'
									alt=''
								/>
							</a>
						</div>
					</div>
					<div className='w-full flex items-center flex-col justify-center py-3'>
						<div className='w-full flex flex-wrap justify-center'>
							{footerLinks.map((item, i) => (
								<a
									href={item.to}
									target='_blank'
									className='p-1 text-xs text-gray-500 hover:underline first:ml-0 mx-2 last:mr-0'
									key={'link_ ' + i}
								>
									{item.title}
								</a>
							))}
						</div>
						<div className='inline-flex items-center py-2 mt-4'>
							<select className='outline-none border-none bg-transparent text-xs text-gray-500 mr-3'>
								<option value='eng'>English</option>
								<option value='uz'>Uzbek</option>
								<option value='ru'>Russia</option>
							</select>
							<span className='text-xs text-gray-500'>
								© 2024 Instagram from Meta
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AuthLayout
