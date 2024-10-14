import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const UserHeader = ({ handeLogout }) => {
	const [openDrop, setOpenDrop] = useState(false)

	// ======== Click everywhere to close User Drop menu ======= //
	const menuRef = useRef()
	const imgRef = useRef()
	useEffect(() => {
		const handleClickOutside = e => {
			// Check if the click is outside both the menu and the image
			if (
				menuRef.current &&
				imgRef.current &&
				menuRef.current !== e.target &&
				!imgRef.current.contains(e.target) // Bu yuqoridagi conditionni oson usuli
			) {
				setOpenDrop(false)
			}
		}

		window.addEventListener('click', handleClickOutside)

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener('click', handleClickOutside)
		}
	}, [])
	return (
		<>
			<div className='w-32 relative'>
				<img
					ref={imgRef}
					className='object-cover w-12 cursor-pointer rounded-full shadow-md shadow-gray-400 hover:shadow-gray-600 duration-200'
					src='/Members/default_user.webp'
					alt=''
					onClick={() => setOpenDrop(!openDrop)}
				/>
				{openDrop && (
					<div
						ref={menuRef}
						className='w-full h-auto bg-white rounded-md p-4 border border-gray-300 shadow-lg  absolute -left-14 top-16 '
					>
						<ul>
							<li className='p-1 text-md cursor-pointer rounded hover:bg-blue-100'>
								<Link to={'/'} onClick={() => setOpenDrop(false)}>
									My Profile
								</Link>
							</li>
							<li
								onClick={handeLogout}
								className='p-1 text-md cursor-pointer rounded hover:bg-blue-100'
							>
								Log-Out
							</li>
						</ul>
					</div>
				)}
			</div>
		</>
	)
}

export default UserHeader
