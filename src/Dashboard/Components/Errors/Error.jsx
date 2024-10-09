import React from 'react'

const AuthorizeError = () => {
	return (
		<div className='w-full h-full flex flex-col items-center pt-20'>
			<h1 className='text-xl font-bold text-gray-700'>
				Only Authorized Users can use this page!
			</h1>
			<h3 className='text-xl font-bold text-gray-700'>
				Please Login with your Client accaunt.
			</h3>
			<img src='/Shared_photo/Auth_err.jpg' alt='' className='' />
		</div>
	)
}

export default AuthorizeError
