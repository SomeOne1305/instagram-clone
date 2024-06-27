import { QueryClientProvider } from '@tanstack/react-query'
import TopLoader from 'nextjs-toploader'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { queryClient } from './Providers.tsx'
import { router } from './Router.tsx'
import './css/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider
				router={router}
				fallbackElement={<TopLoader color='red' height={5} zIndex={30} />}
			/>
		</QueryClientProvider>
	</React.StrictMode>
)
