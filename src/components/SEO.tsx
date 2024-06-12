import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
	title: string
	description: string
	keywords: string
	author: string
	lang?: string
	meta?: Array<{
		name: string
		content: string
	}>
	ogType?: string
	ogImage?: string
	ogUrl?: string
	twitterCard?: string
	twitterCreator?: string
	structuredData?: string
}

const SEO: React.FC<SEOProps> = ({
	title,
	description,
	keywords,
	author,
	lang = 'en',
	meta = [],
	ogType = 'website',
	ogImage,
	ogUrl,
	twitterCard = 'summary',
	twitterCreator,
	structuredData,
}) => {
	const metaData = [
		{
			name: 'description',
			content: description,
		},
		{
			name: 'keywords',
			content: keywords,
		},
		{
			name: 'author',
			content: author,
		},
		{
			name: 'viewport',
			content: 'width=device-width, initial-scale=1',
		},
		{
			name: 'robots',
			content: 'index, follow',
		},
		{
			property: 'og:title',
			content: title,
		},
		{
			property: 'og:description',
			content: description,
		},
		{
			property: 'og:type',
			content: ogType,
		},
		{
			property: 'og:url',
			content: ogUrl,
		},
		{
			property: 'og:image',
			content: ogImage,
		},
		{
			name: 'twitter:card',
			content: twitterCard,
		},
		{
			name: 'twitter:creator',
			content: twitterCreator,
		},
		{
			name: 'twitter:title',
			content: title,
		},
		{
			name: 'twitter:description',
			content: description,
		},
		...meta,
	]

	return (
		<Helmet>
			<html lang={lang} />
			<title>{title}</title>
			<meta charSet='utf-8' />
			{metaData.map((item, index) => (
				<meta key={index} {...item} />
			))}
			{structuredData && (
				<script type='application/ld+json'>{structuredData}</script>
			)}
		</Helmet>
	)
}

export default SEO
