import { useEffect, useRef, useState } from 'react'
import { FaLock, FaLockOpen } from 'react-icons/fa6'
import io from 'socket.io-client'

// Initialize the Socket.IO client connection
const socket = io('http://localhost:3000')

function NodeDisplayAlarm() {
	const [error, setError] = useState('')
	const [nodes, setNodes] = useState([])
	const [socketConnected, setSocketConnected] = useState(false)
	const alarmRef = useRef(null) // Ref for the audio element

	// Request permission for notifications
	useEffect(() => {
		if (Notification.permission !== 'granted') {
			Notification.requestPermission()
		}
	}, [])

	// Function to create 10 test nodes
	const createTestNodes = () => {
		return Array.from({ length: 10 }, (_, index) => ({
			doorNum: index + 1,
			doorChk: index % 2 === 0 ? 1 : 0, // Open for even doors, closed for odd
			betChk: `${(12.0 + Math.random() * 2).toFixed(1)}V`, // Random battery status
		}))
	}

	// Function to show browser notification
	const showNotification = (title, body) => {
		if (Notification.permission === 'granted') {
			new Notification(title, { body })
		}
	}

	// Simulating fetching gateways (test data)
	const fetchGateways = async () => {
		try {
			setTimeout(() => {
				const testNodes = createTestNodes()
				setNodes(testNodes)

				// Check if any node has an open door and trigger the alarm
				const openDoorNode = testNodes.find(node => node.doorChk === 1)
				if (openDoorNode) {
					playAlarm()
					showNotification(
						'Door Open',
						`Node ${openDoorNode.doorNum} door is open!`
					)
				}
			}, 1000)
		} catch (error) {
			setError('An error occurred while fetching gateways.')
		}
	}

	useEffect(() => {
		// Load test nodes when the component mounts
		fetchGateways()

		// Setup socket.io events
		socket.on('connect', () => {
			setSocketConnected(true)
		})

		socket.on('disconnect', () => {
			setSocketConnected(false)
		})

		socket.on('mqttData', data => {
			const parsedData = JSON.parse(data)

			setNodes(prevNodes => {
				const existingNodeIndex = prevNodes.findIndex(
					node => node.doorNum === parsedData.doorNum
				)
				if (existingNodeIndex !== -1) {
					const updatedNodes = [...prevNodes]
					updatedNodes[existingNodeIndex] = parsedData

					// Play alarm if door is open
					if (parsedData.doorChk === 1) {
						playAlarm()
						showNotification(
							'Door Open',
							`Node ${parsedData.doorNum} door is open!`
						)
					}

					return updatedNodes
				} else {
					return [...prevNodes, parsedData]
				}
			})
		})

		return () => {
			socket.off('connect')
			socket.off('disconnect')
			socket.off('mqttData')
		}
	}, [])

	// Play alarm sound
	const playAlarm = () => {
		if (alarmRef.current) {
			alarmRef.current
				.play()
				.catch(err => console.log('Error playing alarm:', err))
		}
	}

	// Test the alarm by clicking a button (for manual trigger)
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

			{/* Test Alarm Button */}
			<div className='text-center mb-4'>
				<button
					onClick={testAlarm}
					className='px-4 py-2 bg-blue-500 text-white rounded'
				>
					Test Alarm Sound
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
						<h3 className='text-md mt-2'>Battery Status: {node.betChk}</h3>
					</div>
				))}
			</div>

			{/* Hidden audio element for playing the alarm */}
			<audio ref={alarmRef} src='/Audio/alarm_audio.wav' />
		</div>
	)
}

export default NodeDisplayAlarm
