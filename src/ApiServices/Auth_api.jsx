import axios from 'axios'

const baseURL = 'http://localhost:3000/'

export const signupRequest = async signupData => {
	try {
		const result = await axios.post(`${baseURL}signup`, signupData, {
			withCredentials: true,
		})

		if (!result?.data || result.data.state === 'fail') {
			throw new Error('Sign up failed')
		}

		const user_data = result.data.data
		localStorage.setItem('user_data', JSON.stringify(user_data))
		return user_data // Assuming the response contains user data
	} catch (err) {
		console.error(`ERROR ::: signupRequest ${err.message}`)
		throw err
	}
}

export const loginRequest = async loginData => {
	try {
		const result = await axios.post(`${baseURL}login`, loginData, {
			withCredentials: true,
		})
		console.log('API response', result)

		if (!result?.data || result?.data.state === 'fail') {
			throw new Error('Login failed')
		}

		localStorage.setItem('user_data', JSON.stringify(result.data.data))
		return result
	} catch (err) {
		console.error(`ERROR ::: loginRequest ${err.message}`)
		throw err
	}
}

export const logOutRequest = async () => {
	try {
		const result = await axios.get(`${baseURL}logout`, {
			withCredentials: true,
		})
		if (!result?.data) {
			throw new Error('Failed Logout :(')
		}

		if (!result?.data.state === 'fail') {
			throw new Error('Failed Logout :(')
		}

		const logout_result = result.data.state
		localStorage.removeItem('user_data')

		return logout_result === 'success'
	} catch (err) {
		console.log(`ERROR ::: logOutRequest ${err.message}`)
		throw err
	}
}
