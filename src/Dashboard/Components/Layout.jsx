import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { verifyUserData } from '../../ApiServices/verifyAuth'
import AuthorizeError from './Errors/Error'
import Header from './Header'
import Sidebar from './Sidebar'

const DashboardLayout = () => {
	return (
		<>
			{verifyUserData ? (
				<div className='flex bg-[#f5f5f5] h-screen'>
					{/* Kept the h-screen class */}
					<Sidebar />

					<div className='w-full ml-16 md:ml-56'>
						<Header />
						<Outlet />
						<ToastContainer autoClose={1500} closeOnClick />
					</div>
				</div>
			) : (
				<AuthorizeError />
			)}
		</>
	)
}

export default DashboardLayout
