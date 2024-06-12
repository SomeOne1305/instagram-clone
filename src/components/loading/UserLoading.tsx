import ContentLoader from 'react-content-loader'
import useThemeStore from '../../stores/useThemeStore'

const UserLoading = () => {
	const { theme } = useThemeStore()
	return (
		<ContentLoader
			speed={2}
			width={358}
			height={140}
			viewBox='0 0 358 140'
			backgroundColor={theme === 'light' ? '#f3f3f3' : '#646262'}
			foregroundColor={theme === 'light' ? '#ecebeb' : '#a39f9f'}
		>
			<circle cx='47' cy='83' r='33' />
			<rect x='90' y='62' rx='8' ry='8' width='241' height='11' />
			<rect x='90' y='88' rx='8' ry='8' width='178' height='11' />
		</ContentLoader>
	)
}

export default UserLoading
