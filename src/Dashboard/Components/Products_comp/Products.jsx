import { BsCalendarDate } from 'react-icons/bs'
import { FaHourglassStart } from 'react-icons/fa6'
import { MdOutlineLocationCity } from 'react-icons/md'
import { PiUserCircleCheckFill } from 'react-icons/pi'
import { Activeproducts } from '../../DB/Client_data'
import { calculateDaysUntilExpiry } from '../../Functions/Cal_Expiry_date'

const Products = () => {
	return (
		<>
			<div className='w-full h-auto flex justify-center mt-4'>
				<h1 className='leading-none text-3xl font-bold text-gray-700 pb-2 mb-5 underline underline-offset-4'>
					All Products List
				</h1>
			</div>
			<div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4 p-4'>
				{Activeproducts.map((client, index) => {
					const daysRemaining = calculateDaysUntilExpiry(client.expiry_date)
					const daysRemainingStyle = daysRemaining < 20 ? 'text-red-700' : ''
					return (
						<div
							key={index}
							className='p-5 bg-white rounded-xl shadow-xl shadow-indigo-200 cursor-pointer hover:shadow-indigo-400'
						>
							<div className='flex justify-between'>
								<h1 className='leading-none text-xl font-bold text-gray-700 pb-2'>
									Clinet:
									<span className='text-center text-lg font-semibold text-gray-800 ml-1'>
										{client.client_company}
									</span>
								</h1>
								<PiUserCircleCheckFill
									className={`text-indigo-700 ${daysRemainingStyle}`}
									size={40}
								/>
							</div>
							<div className='mt-5 flex flex-col space-y-5 pr-10'>
								<div className='flex justify-start space-x-10 items-center text-left'>
									<MdOutlineLocationCity size={30} className='text-gray-700' />
									<h1 className='w-1/2'>Total buildings</h1>
									<p>{client.number_of_buildings}</p>
								</div>
								<div className='flex justify-start space-x-10 items-center text-left'>
									<FaHourglassStart size={30} className='text-gray-700' />
									<h1 className='w-1/2'>Remaining days</h1>
									<p>{daysRemaining}</p>
								</div>
								<div className='flex justify-start space-x-10 items-center text-left'>
									<BsCalendarDate size={30} className='text-gray-700' />
									<h1 className='w-1/2'>Expiry-date</h1>
									<p>{client.expiry_date}</p>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</>
	)
}

export default Products
