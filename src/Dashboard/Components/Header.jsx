// === Icons === //
import { FaClipboardList, FaPlus } from 'react-icons/fa'
import { GoBell } from 'react-icons/go'
import { Link } from 'react-router-dom'
const Header = () => {
	return (
		<div className='flex justify-between items-center p-4'>
			<div>
				<h1 className='text-xs font-bold text-gray-700'>Welcome Back!</h1>
				<p className='text-xl font-semibold text-gray-700'>Manager Kim</p>
			</div>
			<div className='flex items-center space-x-5'>
				<div className='hidden md:flex'>
					<Link to={'/statistics-list'}>
						<button
							type='button'
							className='flex items-center justify-between text-gray-700 bg-white shadow-md shadow-gray-400 hover:shadow-gray-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-3 text-center me-2'
						>
							Statistics-List
							<FaClipboardList size={20} className='ml-2 text text-gray-700' />
						</button>
					</Link>
					<Link to={'/add-product'}>
						<button
							type='button'
							className='flex items-center justify-between text-indigo-600 bg-white shadow-md shadow-indigo-300 hover:shadow-indigo-500 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-3 text-center me-2'
						>
							Add Product
							<FaPlus className='ml-2' />
						</button>
					</Link>
					<Link to={'/create-client'}>
						<button
							type='button'
							className='flex items-center justify-between text-white bg-indigo-600 shadow-md shadow-gray-50 hover:shadow-gray-400 font-medium rounded-lg text-sm px-5 py-3 text-center me-2'
						>
							Create Client
							<FaPlus className='ml-2' />
						</button>
					</Link>
				</div>
				<div className='flex items-center space-x-5'>
					<button className='relative text-2xl text-gray-600'>
						<GoBell size={32} />
						<span className='absolute top-0 right-0 -mt-1 -mr-1 flex justify-center items-center bg-indigo-600 text-white font-semibold text-[10px] w-5 h-5 rounded-full border-2 border-white '>
							9
						</span>
					</button>
					<img
						src='/Members/Kim_prof.jpg'
						alt='Admin_img'
						className='w-14 h-14 rounded-full border-2 border-indigo-500'
					/>
				</div>
			</div>
		</div>
	)
}

export default Header
