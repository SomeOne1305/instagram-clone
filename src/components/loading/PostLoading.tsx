import ContentLoader from 'react-content-loader'
import useThemeStore from '../../stores/useThemeStore'

const PostLoading = () => {
	const { theme } = useThemeStore()
	return (
		<ContentLoader
			speed={2}
			width={400}
			className='mx-auto'
			height={460}
			viewBox='0 0 400 460'
			backgroundColor={theme === 'light' ? '#f3f3f3' : '#646262'}
			foregroundColor={theme === 'light' ? '#ecebeb' : '#a39f9f'}
		>
			<circle cx='31' cy='31' r='15' />
			<rect x='58' y='18' rx='2' ry='2' width='140' height='10' />
			<rect x='58' y='34' rx='2' ry='2' width='140' height='10' />
			<rect x='0' y='60' rx='2' ry='2' width='400' height='400' />
		</ContentLoader>
	)
}

export default PostLoading
