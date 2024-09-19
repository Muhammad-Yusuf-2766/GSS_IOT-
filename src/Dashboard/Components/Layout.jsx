import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const DashboardLayout = () => {
	return (
		<div className='flex bg-[#f5f5f5]'>
			<Sidebar />
			<div className='w-full ml-16 md:ml-56'>
				<Header />
				<Outlet />
			</div>
		</div>
	)
}

export default DashboardLayout
