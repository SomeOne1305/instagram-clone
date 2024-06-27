import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import PostCard from '../components/Post/PostCard'
import SEO from '../components/SEO'
import PostLoading from '../components/loading/PostLoading'
import { structuredData } from '../constants/structuredSeo'
import { PostService } from '../services/Post.service'
import { IGetPost } from '../types/post.interface'

const HomePage = () => {
	const getPosts = useInfiniteQuery<IGetPost>({
		queryKey: ['GET_POSTS'],
		queryFn: ({ pageParam = 1 }) => PostService.getAll(pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) => {
			const maxPages = Math.ceil(lastPage.total / 3)
			if (pages.length >= maxPages) return undefined // No more pages
			return pages.length + 1 // Fetch the next page
		},
	})
	const { ref, inView } = useInView()
	useEffect(() => {
		if (inView) {
			getPosts.fetchNextPage()
		}
	})

	return (
		<div className='w-full pt-20'>
			<SEO
				title='Главная страница'
				description='This is the home page of my website.'
				keywords='home, awesome website,instagram, instagram-clone, github, insta clone, instagram project, instagram clone react js'
				author='Kholmuminov Ahmadullo'
				ogUrl='https://example.com/'
				ogImage='https://example.com/image.jpg'
				twitterCard='summary_large_image'
				twitterCreator='@yourtwitterhandle'
				structuredData={structuredData}
			/>
			<div className='container'>
				<div className='max-w-[540px] mx-auto w-full'>
					{getPosts.isLoading && (
						<div className='w-full flex items-center'>
							<PostLoading />
						</div>
					)}
					{getPosts.data?.pages.map(page => (
						<div className='w-full'>
							{page.posts?.map((post, i) => (
								<PostCard data={post} key={post.id} index={i} />
							))}
						</div>
					))}
					{getPosts.isFetchingNextPage && (
						<div className='w-full flex items-center'>
							<PostLoading />
						</div>
					)}
					<div className='w-full py-2' ref={ref}></div>
				</div>
			</div>
		</div>
	)
}

export default HomePage
