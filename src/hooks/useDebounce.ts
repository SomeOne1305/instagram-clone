import { useEffect, useState } from 'react'

/*
@param {string} value
@param {number} delay
@returns {string} debouncedValue
*/

export const useDebounce = (value: string, delay: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => {
			clearTimeout(handler)
		}
	}, [value, delay])

	return debouncedValue
}
