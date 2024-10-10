import { useState } from 'react'

// Initial structure of a product
const initialProductState = {
	id: 0,
	GW_cardinal: {
		South: false,
		North: false,
		East: false,
		West: false,
	},
	GW_number: '',
	GW_nodes: '',
	GW_status: false,
}

const ProductForm = () => {
	const [product, setProduct] = useState(initialProductState)

	// Handle input changes for GW_number, GW_nodes, and GW_status
	const handleInputChange = e => {
		const { name, value, type, checked } = e.target
		setProduct(prevProduct => ({
			...prevProduct,
			[name]: type === 'checkbox' ? checked : value,
		}))
	}

	// Handle checkbox changes for GW_cardinal
	const handleCheckboxChange = e => {
		const { name, checked } = e.target
		setProduct(prevProduct => ({
			...prevProduct,
			GW_cardinal: {
				...prevProduct.GW_cardinal,
				[name]: checked,
			},
		}))
	}

	const onSave = product => {
		console.log('Saved Product:', product)
	}

	// Handle form submission
	const handleSubmit = e => {
		e.preventDefault() // bu submit bo'lganda sahifa refresh bo'lmasligini va data saqlanib qolishi uchun
		onSave(product)
		setProduct(initialProductState) // Reset form after submission
	}

	return (
		<div className='w-full h-full flex justify-center items-center flex-col'>
			<h1 className='leading-none text-3xl font-bold text-gray-700 pb-2 mb-5 underline underline-offset-4'>
				Add new Product
			</h1>
			<form
				onSubmit={handleSubmit}
				className='w-1/3 p-4 border bg-white rounded-lg shadow-lg shadow-indigo-300'
			>
				<h4 className='text-center text-lg text-gray-700 font-bold capitalize mb-4'>
					Safety management control system
				</h4>
				<div className='mb-4'>
					<label className='block text-gray-700 font-bold mb-2'>
						GW Number:
					</label>
					<input
						type='number'
						name='GW_number'
						value={product.GW_number}
						onChange={handleInputChange}
						className='w-1/2 outline outline-1 outline-indigo-500 px-3 py-2 border border-gray-300 rounded-md'
						required
					/>
				</div>

				<div className='mb-4'>
					<label className='block text-gray-700 font-bold mb-2'>
						GW Nodes:
					</label>
					<input
						type='number'
						name='GW_nodes'
						value={product.GW_nodes}
						onChange={handleInputChange}
						className='w-1/2 outline outline-1 outline-indigo-500 px-3 py-2 border border-gray-300 rounded-md'
						required
					/>
				</div>
				<div className='flex justify-around'>
					<div className='mb-4'>
						<label className='block text-gray-700 font-bold mb-2'>
							GW Status:
						</label>
						<input
							type='checkbox'
							name='GW_status'
							checked={product.GW_status}
							onChange={handleInputChange}
							className='mr-2'
						/>
						<span>{product.GW_status ? 'Active' : 'Inactive'}</span>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700 font-bold mb-2'>
							GW Cardinal:
						</label>
						{/* Object.keys metod abj dagi key larni arry qilib qaytaradi */}
						{Object.keys(product.GW_cardinal).map(direction => (
							<div key={direction} className='flex items-center'>
								<input
									type='checkbox'
									name={direction}
									checked={product.GW_cardinal[direction]}
									onChange={handleCheckboxChange}
									className='mr-2'
								/>
								<label>{direction}</label>
							</div>
						))}
					</div>
				</div>

				<button
					type='submit'
					className='flex items-center justify-between text-white bg-indigo-600 shadow-md shadow-gray-50 hover:shadow-gray-400 font-medium rounded-lg text-sm px-5 py-3 text-center me-2'
				>
					Save Product
				</button>
			</form>
		</div>
	)
}

export default ProductForm
