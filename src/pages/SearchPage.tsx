import { useCallback, useEffect, useState } from 'react'
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import SEO from '../components/SEO'
import { useDebounce } from '../hooks/useDebounce'

const SearchPage = () => {
	const [searchParams] = useSearchParams()
	const initialQuery = searchParams.get('q') || ''
	const [query, setQuery] = useState(initialQuery)
	const navigate = useNavigate()
	const debouncedQuery = useDebounce(query, 700)

	const handleSearch = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value
			setQuery(value)
			if (value.length > 1) {
				navigate(`/search?q=${encodeURIComponent(value)}`)
			} else {
				navigate('/search')
			}
		},
		[navigate]
	)

	useEffect(() => {
		setQuery(initialQuery)
	}, [initialQuery])

	return (
		<div className='w-full pt-20'>
			<SEO
				title={query ? `Результаты поиска для "${query}"` : 'Поиск'}
				description={
					query
						? `Find user profiles and content related to "${query}"`
						: 'Search for user profiles and content.'
				}
				keywords={
					query
						? `search, ${query}, user profiles, content`
						: 'search, user profiles, content'
				}
				author='Instagram'
				ogUrl={window.location.href}
				ogImage='/path/to/your/default-image.jpg'
				twitterCreator='@Instagram'
			/>
			<div className='container'>
				<div className='max-w-[540px] mx-auto w-full'>
					<div className='w-full flex items-center justify-between p-1 rounded-lg bg-gray-200 dark:bg-gray-600'>
						<input
							type='text'
							className='p-2 text-sm md:text-base bg-transparent placeholder:text-gray-400 outline-none border-none dark:text-slate-100'
							placeholder='Search'
							value={query}
							onChange={handleSearch}
						/>
					</div>
					<Outlet context={debouncedQuery} />
				</div>
			</div>
		</div>
	)
}

export default SearchPage
