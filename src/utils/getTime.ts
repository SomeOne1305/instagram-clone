export const getTimeDifference = (dateString: string): string => {
	// Parse the UTC date string directly
	const date = new Date(dateString)
	const now = new Date()
	const differenceInMilliseconds =
		now.getTime() - date.getTime() - date.getTimezoneOffset()

	const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000)
	const differenceInMinutes = Math.floor(differenceInSeconds / 60)
	const differenceInHours = Math.floor(differenceInMinutes / 60)
	const differenceInDays = Math.floor(differenceInHours / 24)
	const differenceInWeeks = Math.floor(differenceInDays / 7)
	const differenceInMonths = Math.floor(differenceInDays / 30)
	const differenceInYears = Math.floor(differenceInDays / 365)

	if (differenceInSeconds < 60) {
		return 'только что'
	} else if (differenceInMinutes < 60) {
		return `${differenceInMinutes} минут${
			differenceInMinutes % 10 === 1 && differenceInMinutes !== 11
				? 'у'
				: differenceInMinutes % 10 >= 2 &&
				  differenceInMinutes % 10 <= 4 &&
				  !(differenceInMinutes >= 12 && differenceInMinutes <= 14)
				? 'ы'
				: ''
		} назад`
	} else if (differenceInHours < 24) {
		return `${differenceInHours} час${
			differenceInHours % 10 === 1 && differenceInHours !== 11
				? ''
				: differenceInHours % 10 >= 2 &&
				  differenceInHours % 10 <= 4 &&
				  !(differenceInHours >= 12 && differenceInHours <= 14)
				? 'а'
				: 'ов'
		} назад`
	} else if (differenceInDays < 7) {
		return `${differenceInDays} день${
			differenceInDays % 10 === 1 && differenceInDays !== 11
				? ''
				: differenceInDays % 10 >= 2 &&
				  differenceInDays % 10 <= 4 &&
				  !(differenceInDays >= 12 && differenceInDays <= 14)
				? 'я'
				: 'ей'
		} назад`
	} else if (differenceInWeeks < 4) {
		return `${differenceInWeeks} недел${
			differenceInWeeks === 1 ? 'ю' : 'и'
		} назад`
	} else if (differenceInMonths < 12) {
		return `${differenceInMonths} месяц${
			differenceInMonths % 10 === 1 && differenceInMonths !== 11
				? ''
				: differenceInMonths % 10 >= 2 &&
				  differenceInMonths % 10 <= 4 &&
				  !(differenceInMonths >= 12 && differenceInMonths <= 14)
				? 'а'
				: 'ев'
		} назад`
	} else {
		return `${differenceInYears} год${
			differenceInYears % 10 === 1 && differenceInYears !== 11
				? ''
				: differenceInYears % 10 >= 2 &&
				  differenceInYears % 10 <= 4 &&
				  !(differenceInYears >= 12 && differenceInYears <= 14)
				? 'а'
				: 'лет'
		} назад`
	}
}
