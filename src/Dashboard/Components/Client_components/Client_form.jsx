/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

const ClientForm = ({ products }) => {
	// State to manage client data
	const [client, setClient] = useState({
		client_company: '',
		number_of_buildings: '',
		buildings_addresses: '',
		client_users: {
			user1_boss: '',
			user2_user: '',
			user3_user: '',
			user4_user: '',
		},
		using_gateWays: [], // Will store selected GW_numbers directly
		permit_date: '',
		expiry_date: '',
		client_status: true, // Initial client status is true
	})

	// State to manage the visibility of the dropdown
	const [dropdownOpen, setDropdownOpen] = useState(false)

	// State to manage selected gateways
	const [selectedGateways, setSelectedGateways] = useState([])

	// Toggle the dropdown menu
	const toggleDropdown = () => {
		setDropdownOpen(prevState => !prevState)
	}

	// Handle checkbox change
	const handleCheckboxChange = gwNumber => {
		setSelectedGateways(prevSelectedGateways =>
			prevSelectedGateways.includes(gwNumber)
				? prevSelectedGateways.filter(num => num !== gwNumber)
				: [...prevSelectedGateways, gwNumber]
		)
	}

	// Filter out products with GW_status: false
	const filteredProducts = products.filter(product => product.GW_status)

	// Handle input change
	const handleInputChange = e => {
		const { name, value } = e.target
		setClient(prevClient => ({
			...prevClient,
			[name]: value,
		}))
	}

	// Handle date change
	const handleDateChange = e => {
		const { name, value } = e.target
		setClient(prevClient => ({
			...prevClient,
			[name]: value,
		}))
	}

	// Function to check and update client status based on expiry date
	const checkClientStatus = () => {
		const today = new Date()
		console.log(today)
		const expiryDate = new Date(client.expiry_date)

		// Adjust time to ignore time part in the date comparison
		today.setHours(0, 0, 0, 0) // Set to midnight to compare dates only, ignoring time
		expiryDate.setHours(0, 0, 0, 0)

		if (expiryDate < today) {
			// If expiry date has passed, set client_status to false
			setClient(prevClient => ({
				...prevClient,
				client_status: false,
			}))
		} else {
			// If expiry date is in the future or today, set client_status to true
			setClient(prevClient => ({
				...prevClient,
				client_status: true,
			}))
		}
	}

	// Automatically check status on expiry date change
	useEffect(() => {
		if (client.expiry_date) {
			checkClientStatus()
		}
	}, [client.expiry_date])

	// Handle form submission
	const handleSubmit = e => {
		e.preventDefault()

		// Update client state with selected gateways
		setClient(prevClient => {
			const updatedClient = {
				...prevClient,
				using_gateWays: selectedGateways,
			}

			// Log updated client after setting the state
			console.log(updatedClient)
			return updatedClient
		})

		// Check client status on submit as well
		checkClientStatus()
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md'
		>
			{/* Client Company */}
			<div className='mb-4'>
				<label className='block text-gray-500 text-sm font-medium mb-2'>
					Client Company:
				</label>
				<input
					required
					type='text'
					name='client_company'
					value={client.client_company}
					onChange={handleInputChange}
					className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-700'
				/>
			</div>

			{/* Number of Buildings */}
			<div className='mb-4'>
				<label className='block text-gray-500 text-sm font-medium mb-2'>
					Number of Buildings:
				</label>
				<input
					required
					type='number'
					name='number_of_buildings'
					value={client.number_of_buildings}
					onChange={handleInputChange}
					className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-700'
				/>
			</div>

			{/* Buildings Addresses */}
			<div className='mb-4'>
				<label className='block text-gray-500 text-sm font-medium mb-2'>
					Buildings Addresses:
				</label>
				<input
					required
					type='text'
					name='buildings_addresses'
					value={client.buildings_addresses}
					onChange={handleInputChange}
					className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-700'
				/>
			</div>

			{/* Gate-ways Section */}
			<div className='mb-4'>
				<h3 className='text-lg font-semibold text-gray-700'>Gate-ways</h3>
				<div className='relative'>
					<button
						type='button'
						onClick={toggleDropdown}
						className='w-full px-4 py-2 bg-indigo-700 text-white rounded-md text-left flex justify-between items-center hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-700'
					>
						Select Gateways
						<svg
							className={`w-5 h-5 transform transition-transform ${
								dropdownOpen ? 'rotate-180' : ''
							}`}
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M19 9l-7 7-7-7'
							/>
						</svg>
					</button>

					{dropdownOpen && (
						<div className='mt-2 p-4 border border-gray-300 rounded-md bg-gray-50 absolute w-full z-10'>
							{filteredProducts.length === 0 ? (
								<p className='text-gray-500'>No available gateways</p>
							) : (
								filteredProducts.map(product => (
									<div key={product.id} className='flex items-center mb-2'>
										<input
											type='checkbox'
											id={`gw-${product.GW_number}`}
											checked={selectedGateways.includes(product.GW_number)}
											onChange={() => handleCheckboxChange(product.GW_number)}
											className='mr-2'
										/>
										<label
											htmlFor={`gw-${product.GW_number}`}
											className='text-gray-500'
										>
											GW-{product.GW_number}
										</label>
									</div>
								))
							)}
						</div>
					)}
				</div>
			</div>

			{/* Permit Date */}
			<div className='mb-4'>
				<label className='block text-gray-500 text-sm font-medium mb-2'>
					Permit Date:
				</label>
				<input
					required
					type='date'
					name='permit_date'
					value={client.permit_date}
					onChange={handleDateChange}
					className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-700'
				/>
			</div>

			{/* Expiry Date */}
			<div className='mb-4'>
				<label className='block text-gray-500 text-sm font-medium mb-2'>
					Expiry Date:
				</label>
				<input
					required
					type='date'
					name='expiry_date'
					value={client.expiry_date}
					onChange={handleDateChange}
					min={client.permit_date} // Ensures expiry date can't be before permit date
					className='w-full px-3 py-2 border border-gray-300 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-700'
				/>
			</div>

			{/* Submit Button */}
			<div className='flex justify-center mt-6'>
				<button
					type='submit'
					className='bg-indigo-700 text-white px-6 py-2 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-700'
				>
					Submit
				</button>
			</div>
		</form>
	)
}

export default ClientForm
