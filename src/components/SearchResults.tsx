import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { RiUserSearchLine } from 'react-icons/ri'
import { Link, useOutletContext, useSearchParams } from 'react-router-dom'
import UserLoading from '../components/loading/UserLoading'
import { UserService } from '../services/User.service'
import { IUser } from '../types/user.interface'

const SearchResults = () => {
	const debouncedQuery = useOutletContext<string>()
	const [searchParams] = useSearchParams()
	const query = searchParams.get('q') || ''

	const searchUsers = useQuery<IUser[], Error>({
		queryKey: ['search', debouncedQuery],
		queryFn: () => UserService.search(debouncedQuery),
		enabled: debouncedQuery.length > 1,
	})

	const results = useMemo(() => {
		if (searchUsers.isLoading) {
			return [0, 1, 2].map(item => <UserLoading key={item} />)
		}

		if (searchUsers.data?.length) {
			return searchUsers.data.map(item => (
				<div className='w-full flex items-center p-2' key={item.id}>
					<div className='inline-flex items-center mr-2'>
						<div className='sm:w-14 sm:h-14 w-11 h-11'>
							<img
								src={item.profileImg?.url}
								className='w-full h-full rounded-full select-none'
								alt={item.username}
							/>
						</div>
						<div className='py-1 px-3'>
							<Link
								to={`/${item.username}/`}
								className='dakk:text-slate-100 font-bold text-base'
							>
								{item.username}
							</Link>
							<span className='text-sm dark:text-gray-400 text-gray-600 whitespace-nowrap line-clamp-1'>
								{item.fullName}
							</span>
						</div>
					</div>
				</div>
			))
		}

		return (
			<>
				{query.length > 0 ? (
					<div className='text-gray-500 dark:text-gray-300'>
						No results found
					</div>
				) : (
					<div className='w-full mt-3 text-center'>
						<div className='size-16 border-2 border-black rounded-full dark:border-slate-100 flex items-center justify-center mx-auto'>
							<RiUserSearchLine className='text-2xl dark:text-slate-100' />
						</div>
						<span className='text-lg mt-2 dark:text-slate-100'>
							Поиск пользователей
						</span>
					</div>
				)}
			</>
		)
	}, [searchUsers.isLoading, searchUsers.data])

	return (
		<div className='container'>
			<div className='max-w-[540px] mx-auto w-full py-2 mt-3'>{results}</div>
		</div>
	)
}

export default SearchResults
