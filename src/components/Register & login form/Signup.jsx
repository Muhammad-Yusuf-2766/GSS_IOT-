import React from 'react'

const SignupForm = () => {
	return (
		<div className='w-full h-auto pb-4 grid grid-cols-2 gap-4 justify-between items-center'>
			<div>
				<img src='/Logo_last.png' alt='Logo' />
			</div>
			<section className='mt-10'>
				<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
					<div className='w-full bg-white rounded-lg custom-shadow md:mt-0 sm:max-w-md xl:p-0'>
						<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
							<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
								Create an account
							</h1>
							<form className='space-y-4 md:space-y-6' action='#'>
								<div>
									<label
										for='user_name'
										className='block mb-2 text-sm font-medium'
									>
										Your name
									</label>
									<input
										type='text'
										name='user_name'
										id='user_name'
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
										placeholder='User name'
										required=''
									/>
								</div>
								<div>
									<label for='email' className='block mb-2 text-sm font-medium'>
										Your email
									</label>
									<input
										type='email'
										name='email'
										id='email'
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
										placeholder='name@company.com'
										required=''
									/>
								</div>
								<div>
									<label for='phone' className='block mb-2 text-sm font-medium'>
										Phone number
									</label>
									<input
										type='number'
										name='phone'
										id='phone'
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
										placeholder='User phone'
										required=''
									/>
								</div>
								<div>
									<label
										for='password'
										className='block mb-2 text-sm font-medium'
									>
										Password
									</label>
									<input
										type='password'
										name='password'
										id='password'
										placeholder='••••••••'
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
										required=''
									/>
								</div>
								<div>
									<label
										for='confirm-password'
										className='block mb-2 text-sm font-medium'
									>
										Confirm password
									</label>
									<input
										type='confirm-password'
										name='confirm-password'
										id='confirm-password'
										placeholder='••••••••'
										className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
										required=''
									/>
								</div>
								<button
									type='submit'
									className='w-full text-white border-2 bg-indigo-600 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
								>
									Create an account
								</button>
								<p className='text-sm font-light text-gray-600 '>
									Already have an account?{' '}
									<a
										href='/login'
										className='font-medium hover:underline text-blue-600'
									>
										Login here
									</a>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default SignupForm
