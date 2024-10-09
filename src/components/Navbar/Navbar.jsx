import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logOutRequest } from '../../ApiServices/Auth_api'
import { verifyUserData } from '../../ApiServices/verifyAuth'
import PrimaryBtn from '../Button/PrimaryBtn'
import UserHeader from '../User/Userbadge'

const Navbar = () => {
	const [navbar, setNavbar] = useState(false)
	const handleLogoutRequest = async () => {
		try {
			const res = await logOutRequest()
			if (res) {
				toast.success('Log Out Successfully!', {
					onClose: () => {
						window.location.replace('/') // Use navigate here to redirect after logout
					},
				})
			}
			return res
		} catch (err) {
			console.log(err)
			toast.error('Error on Logout :(')
		}
	}

	const navItems = [
		{
			name: 'Home',
			link: '/',
		},
		{
			name: 'Recources',
			link: '/recources',
		},
		{
			name: 'Services',
			link: '/services',
		},
		{
			name: 'Community',
			link: '/community',
		},
	]
	return (
		<>
			<nav className='fixed w-[100%] h-auto items-center bg-white backdrop-blur-md border border-white/30 shadow-none lg:py-1.5 lg:px-8 px-4 py-3 z-50'>
				<div className='flex justify-between px-8 mx-auto lg:w-full md:items-center md:flex'>
					{/* Navbar logo & toggle button section */}
					<div>
						<div className='flex items-center justify-between py-1 md:py-1 md:block'>
							{/* Logo section */}
							<Link
								to={'/'}
								className='felx flex-col text-3xl text-indigo-600 font-semibold tracking-[0.1rem] flex items-end gap-x-1 relative'
							>
								GSS
								<span className='text-xl'>group</span>
							</Link>
							<div className='md:hidden'>
								<button
									className='p-2 text-gray-700 rounded-md outline-none border border-transparent focus:border-gray-400 focus:border'
									onClick={() => setNavbar(!navbar)}
								>
									{navbar ? (
										<X className='text-gray-700 cursor-pointer' size={24} />
									) : (
										<Menu className='text-gray-400 cursor-pointer' size={24} />
									)}
								</button>
							</div>
						</div>
					</div>
					{/* Navbar menu items section */}
					{/* Updated the className for the div */}
					<div
						className={`flex items-center md:block ${
							navbar
								? 'block h-[80vh]'
								: 'hidden' /* This is the updated part */
						} md:h-auto`}
					>
						<ul className='list-none lg:flex md:flex sm:block block items-center gap-x-2 lg:gap-y-0 md:gap-y-0 sm:gap-y-10 gap-y-10'>
							{navItems.map((item, index) => (
								<li key={index}>
									<Link
										to={item.link}
										className='text-gray-700 text-xl font-semibold hover:underline ease-out duration-700 mx-5 '
									>
										{item.name}
									</Link>
								</li>
							))}
							<li>
								{verifyUserData ? (
									<Link
										to='/dashboard'
										className='text-gray-700 text-xl font-semibold hover:underline ease-out duration-700 mx-5 '
									>
										Dashboard
									</Link>
								) : null}
							</li>
						</ul>
					</div>
					<div className='flex gap-x-2'>
						{verifyUserData ? (
							<div>
								<UserHeader handeLogout={handleLogoutRequest} />
							</div>
						) : (
							<>
								<PrimaryBtn
									className='bg-indigo-600 text-gray-200'
									route='/login'
									children='Login'
								/>
								<PrimaryBtn
									className='bg-indigo-600 text-gray-200'
									route='/signup'
									children='Sign-up'
								/>
							</>
						)}
					</div>
				</div>
			</nav>
		</>
	)
}

export default Navbar
