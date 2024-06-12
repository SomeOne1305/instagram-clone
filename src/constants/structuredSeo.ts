export const structuredData = JSON.stringify({
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	url: `"${window.location.origin}"`,
	potentialAction: {
		'@type': 'SearchAction',
		target: window.location.origin + '/search?q={search_term_string}',
		'query-input': 'required name=search_term_string',
	},
})
