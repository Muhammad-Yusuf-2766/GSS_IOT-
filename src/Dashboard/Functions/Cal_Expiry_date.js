// utils.js
export function calculateDaysUntilExpiry(expiryDateString) {
	const [day, month, year] = expiryDateString.split('.').map(Number)
	const expiryDate = new Date(year, month - 1, day) // Month is zero-based in JavaScript Date
	const currentDate = new Date()
	const timeDifference = expiryDate - currentDate
	const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
	return daysRemaining
}
