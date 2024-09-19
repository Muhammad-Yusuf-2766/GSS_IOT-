import React from 'react'

const LoginForm = () => {
	return (
		<div className='w-full h-screen grid grid-cols-2 justify-between items-center'>
			<div>
				<img src='/Logo_last.png' alt='Logo' />
			</div>
			<section className=''>
				<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
					<a href='#' className='flex items-center mb-6 text-2xl font-semibold'>
						<img
							className='w-8 h-8 mr-2'
							src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
							alt='logo'
						/>
						Flowbite
					</a>
					<div className='w-full bg-white rounded-lg custom-shadow dark:border md:mt-0 sm:max-w-md xl:p-0'>
						<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
							<h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
								Login account
							</h1>
							<form className='space-y-4 md:space-y-6' action='#'>
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

								<button
									type='submit'
									className='w-full text-white border-2 bg-indigo-600 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
								>
									Login
								</button>
								<p className='text-sm font-light text-gray-600 '>
									Do you not have an account yet ?{' '}
									<a
										href='/signup'
										className='font-medium hover:underline text-blue-600'
									>
										Create account here
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

export default LoginForm
