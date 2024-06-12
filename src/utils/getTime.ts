export const getTimeDifference = (dateString: string): string => {
	const date = new Date(dateString)
	const now = new Date()
	const differenceInMilliseconds = now.getTime() - date.getTime()

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
			differenceInMinutes === 1 ? 'у' : differenceInMinutes < 5 ? 'ы' : ''
		} назад`
	} else if (differenceInHours < 24) {
		return `${differenceInHours} час${
			differenceInHours === 1 ? '' : differenceInHours < 5 ? 'а' : 'ов'
		} назад`
	} else if (differenceInDays < 7) {
		return `${differenceInDays} день${
			differenceInDays === 1 ? '' : differenceInDays < 5 ? 'я' : 'ей'
		} назад`
	} else if (differenceInWeeks < 4) {
		return `${differenceInWeeks} недел${
			differenceInWeeks === 1 ? 'ю' : 'и'
		} назад`
	} else if (differenceInMonths < 12) {
		return `${differenceInMonths} месяц${
			differenceInMonths === 1 ? '' : differenceInMonths < 5 ? 'а' : 'ев'
		} назад`
	} else {
		return `${differenceInYears} год${
			differenceInYears === 1 ? '' : differenceInYears < 5 ? 'а' : 'лет'
		} назад`
	}
}
