import axios from 'axios'

const baseURL = 'http://localhost:8080/'

export const loginRequest = async loginData => {
	try {
		const result = await axios.post(`${baseURL}login`, loginData, {
			withCredentials: true,
		})

		if (!result?.data || result?.data.state === 'fail') {
			throw new Error('Login failed')
		}

		const member = result.data.data
		localStorage.setItem('member_data', JSON.stringify(member))
		return member
	} catch (err) {
		console.error(`ERROR ::: loginRequest ${err.message}`)
		throw err
	}
}

export const signupRequest = async signupData => {
	try {
		const result = await axios.post(`${baseURL}signup`, signupData, {
			withCredentials: true,
		})

		if (!result?.data || result?.data.state === 'fail') {
			throw new Error('Signup failed')
		}

		const member = result.data.data
		localStorage.setItem('member_data', JSON.stringify(member))
		return member
	} catch (err) {
		console.error(`ERROR ::: signupRequest ${err.message}`)
		throw err
	}
}

export const logOutRequest = async () => {
	try {
		const result = await axios.get(`${baseURL}logout`, {
			withCredentials: true,
		})

		if (!result?.data || result?.data.state === 'fail') {
			throw new Error('Logout failed')
		}

		localStorage.removeItem('member_data')
		return result.data.state === 'success'
	} catch (err) {
		console.error(`ERROR ::: logOutRequest ${err.message}`)
		throw err
	}
}

export const memberLikeTarget = async data => {
	try {
		const result = await axios.post(`${baseURL}member-liken`, data, {
			withCredentials: true,
		})

		if (!result?.data || result?.data.state === 'fail') {
			throw new Error('Like request failed')
		}

		return result.data.data
	} catch (err) {
		console.error(`ERROR ::: memberLikeTarget ${err.message}`)
		throw err
	}
}

export const getChosenMember = async id => {
	try {
		const result = await axios.get(`${baseURL}member/${id}`, {
			withCredentials: true,
		})

		if (!result?.data || result?.data.state === 'fail') {
			throw new Error('Member request failed')
		}

		return result.data.data
	} catch (err) {
		console.error(`ERROR ::: getChosenMember ${err.message}`)
		throw err
	}
}

export const updateMemberData = async data => {
	try {
		const formData = new FormData()
		formData.append('mb_image', data?.mb_image || '')
		formData.append('mb_phone', data?.mb_phone || '')
		formData.append('mb_address', data?.mb_address || '')
		formData.append('mb_description', data?.mb_description || '')
		formData.append('mb_nick', data?.mb_nick || '')

		const result = await axios.post(`${baseURL}member/update`, formData, {
			withCredentials: true,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})

		if (!result?.data || result?.data.state === 'fail') {
			throw new Error('Update failed')
		}

		const member = result.data.data
		localStorage.setItem('member_data', JSON.stringify(member))
		return member
	} catch (err) {
		console.error(`ERROR ::: updateMemberData ${err.message}`)
		throw err
	}
}
