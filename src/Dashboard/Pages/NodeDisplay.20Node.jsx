import axios from 'axios' // Import Axios for making HTTP requests
import { useEffect, useState } from 'react'
import { FaLock, FaLockOpen } from 'react-icons/fa6' // Import React Icons
import io from 'socket.io-client'

// Initialize the Socket.IO client connection
const socket = io('http://localhost:3000')

function NodeDisplay() {
	const [error, setError] = useState('')
	const [nodes, setNodes] = useState(() => {
		// Load from localStorage if available, otherwise create 20 default nodes
		const savedNodes = localStorage.getItem('nodes')
		if (savedNodes) {
			return JSON.parse(savedNodes)
		} else {
			// Create an array of 20 default nodes
			return Array.from({ length: 20 }, (_, index) => ({
				doorNum: index + 1, // doorNum will be from 1 to 20
				doorChk: 0, // default door state (closed)
				betChk: '0.V', // default battery status
			}))
		}
	})

	// State to track the connection status of the socket
	const [socketConnected, setSocketConnected] = useState(false)

	// Function to fetch gateways for the logged-in boss user
	const fetchGateways = async (userId, userTitle) => {
		try {
			// Choose the appropriate endpoint based on the user's title
			const endpoint =
				userTitle === 'BOSS'
					? 'http://localhost:3000/gateways/boss'
					: 'http://localhost:3000/gateways/worker'

			const response = await axios.get(endpoint, {
				params: { userId }, // Pass userId as a query parameter
			})

			if (response.data.error) {
				setError(
					response.data.error || 'An error occurred while fetching gateways'
				)
			} else {
				console.log('Subscribed to gateways:', response.data)
			}
		} catch (error) {
			console.error('Error fetching gateways:', error)
		}
	}

	useEffect(() => {
		// Fetch logged-in user data from localStorage
		const userData = JSON.parse(localStorage.getItem('user_data'))

		if (userData && userData._id && userData.user_title) {
			// Call the fetchGateways function with the userId and userTitle
			fetchGateways(userData._id, userData.user_title)
		} else {
			console.error(
				'User data not found in localStorage or missing required fields'
			)
		}

		// Listen for socket connection and disconnection events
		socket.on('connect', () => {
			console.log('Socket connected')
			setSocketConnected(true) // Update state to indicate connection
		})

		socket.on('disconnect', () => {
			console.log('Socket disconnected')
			setSocketConnected(false) // Update state to indicate disconnection
		})

		// Listen for incoming MQTT data via Socket.IO
		socket.on('mqttData', data => {
			console.log('Received MQTT data via Socket.io:', data)
			const parsedData = JSON.parse(data) // Convert the message to an object

			// Update the node state
			setNodes(prevNodes => {
				const existingNodeIndex = prevNodes.findIndex(
					node => node.doorNum === parsedData.doorNum
				)
				if (existingNodeIndex !== -1) {
					const updatedNodes = [...prevNodes]
					updatedNodes[existingNodeIndex] = parsedData
					return updatedNodes
				} else {
					return [...prevNodes, parsedData]
				}
			})
		})

		return () => {
			// Clean up the socket connection and event listeners
			socket.off('connect')
			socket.off('disconnect')
			socket.off('mqttData')
		}
	}, [])

	// Whenever `nodes` state updates, save it to localStorage
	useEffect(() => {
		localStorage.setItem('nodes', JSON.stringify(nodes))
	}, [nodes])

	return (
		<div className='px-5'>
			<h1 className='text-2xl font-bold text-center mb-6'>
				Hello MQTT & Socket.io
			</h1>

			{/* Display the connection status */}
			<h2 className='text-center text-lg mb-4'>
				{socketConnected ? 'Socket is Connected' : 'Socket is Disconnected'}
			</h2>

			<div className='node-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 cursor-pointer'>
				{nodes.map(node => (
					<div
						key={node.doorNum}
						className='node-box flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-indigo-500/50 transition-shadow'
					>
						<h2 className='text-xl font-semibold mb-4'>Node {node.doorNum}</h2>

						{/* Render React Icons based on the doorChk value */}
						{node.doorChk === 1 ? (
							<FaLockOpen
								color='red'
								style={{ width: '80px', height: '60px' }}
							/>
						) : (
							<FaLock
								color='#818CF8'
								style={{ width: '100px', height: '100px' }}
							/>
						)}

						<h3 className='text-md mt-2'>
							{node.doorChk === 1 ? 'Door is Open' : 'Door is Closed'}
						</h3>
						<h3 className='text-md mt-2'>
							Battery Status: {parseFloat(node.betChk).toFixed(1)} Volt
						</h3>
					</div>
				))}

				<h1 className='text-lg text-red-600'>{error}</h1>
			</div>
		</div>
	)
}

export default NodeDisplay
