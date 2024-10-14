import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { FaLock, FaLockOpen } from 'react-icons/fa6'
import io from 'socket.io-client'

const socket = io('http://localhost:3000')

function NodeDisplay() {
	const [error, setError] = useState('')
	const [nodes, setNodes] = useState([])
	const [socketConnected, setSocketConnected] = useState(false)
	const alarmRef = useRef(null)

	// Function to fetch gateways for the logged-in boss user
	const fetchGateways = async (userId, userTitle) => {
		try {
			const endpoint =
				userTitle === 'BOSS'
					? 'http://localhost:3000/gateways/boss'
					: 'http://localhost:3000/gateways/worker'

			const response = await axios.get(endpoint, {
				params: { userId },
				validateStatus: status => status < 500,
			})

			if (response.status !== 200 || response.data.error) {
				setError(
					response.data.error || 'An error occurred while fetching gateways'
				)
				setNodes([])
			} else {
				setError('')
				const totalNodeCount = response.data.totalNodeCount || 0
				const initialNodes = Array.from(
					{ length: totalNodeCount },
					(_, index) => ({
						doorNum: index + 1,
						doorChk: 0,
						betChk: '0',
					})
				)
				setNodes(initialNodes)
			}
		} catch (error) {
			console.error('Error fetching gateways:', error)
			setError('An unexpected error occurred while fetching gateways.')
		}
	}

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem('user_data'))

		if (userData && userData._id && userData.user_title) {
			// Check if nodes exist in localStorage before fetching from backend
			const savedNodes = JSON.parse(localStorage.getItem('nodes'))
			if (savedNodes && savedNodes.length > 0) {
				setNodes(savedNodes)
			} else {
				// Fetch from backend if no saved nodes found
				fetchGateways(userData._id, userData.user_title)
			}
		} else {
			console.error(
				'User data not found in localStorage or missing required fields'
			)
		}

		socket.on('connect', () => {
			console.log('Socket connected')
			setSocketConnected(true)
		})

		socket.on('disconnect', () => {
			console.log('Socket disconnected')
			setSocketConnected(false)
		})

		socket.on('mqttData', ({ serialNumber, data }) => {
			console.log('Received MQTT data via Socket.io:', data)

			const parsedData = JSON.parse(data)

			if (parsedData.doorChk === 1) {
				console.log('Playing alarm because doorChk is 1')
				testAlarm()
			}

			setNodes(prevNodes => {
				const existingNodeIndex = prevNodes.findIndex(
					node => node.doorNum === parsedData.doorNum
				)

				let updatedNodes
				if (existingNodeIndex !== -1) {
					updatedNodes = [...prevNodes]
					updatedNodes[existingNodeIndex] = {
						...prevNodes[existingNodeIndex],
						...parsedData,
					}
				} else {
					updatedNodes = [...prevNodes, parsedData]
				}

				// Save the updated nodes to localStorage
				localStorage.setItem('nodes', JSON.stringify(updatedNodes))
				return updatedNodes
			})
		})

		return () => {
			socket.off('connect')
			socket.off('disconnect')
			socket.off('mqttData')
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('nodes', JSON.stringify(nodes))
	}, [nodes])

	const playAlarm = () => {
		if (alarmRef.current) {
			alarmRef.current
				.play()
				.catch(err => console.log('Error playing alarm:', err))
		}
	}

	const testAlarm = () => {
		playAlarm()
	}

	return (
		<div className='px-5'>
			<h1 className='text-2xl font-bold text-center mb-6'>
				Hello MQTT & Socket.io
			</h1>
			<h2 className='text-center text-lg mb-4'>
				{socketConnected ? 'Socket is Connected' : 'Socket is Disconnected'}
			</h2>

			{error && <h1 className='text-lg text-red-600 text-center'>{error}</h1>}

			<div className='text-center mb-4'>
				<button
					onClick={playAlarm}
					className='px-4 py-2 bg-blue-500 text-white rounded'
				>
					Monitoring all nodes
				</button>
			</div>

			<div className='node-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 cursor-pointer'>
				{nodes.map(node => (
					<div
						key={node.doorNum}
						className='node-box flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-indigo-500/50 transition-shadow'
					>
						<h2 className='text-xl font-semibold mb-4'>Node {node.doorNum}</h2>

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
			</div>
			<audio ref={alarmRef} src='/Audio/alarm_audio.wav' />
		</div>
	)
}

export default NodeDisplay
