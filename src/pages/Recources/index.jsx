import React from 'react'
import { AiFillSafetyCertificate } from 'react-icons/ai'
import { GiFruitBowl } from 'react-icons/gi'
import { GrDocumentStore } from 'react-icons/gr'
import { ImMobile } from 'react-icons/im'
import { MdSettingsRemote } from 'react-icons/md'
import { RecourceList } from './tabs'

const downloads = [
	{
		name: 'Geen Smart Control System',
		img: '/Resources/Smart_control.png',
		url: 'https://drive.google.com/file/d/1WnNztuo36lCXHU6YSeYLDuNSP9JWovrh/view?usp=drive_link', // Replace with actual URL
		icon: MdSettingsRemote,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut ipsa quaerat illum? Sint, iste deleniti! Deleniti dolorem tenetur quo consectetur perspiciatis itaque accusamus mollitia! Illo voluptas porro vel nesciunt blanditiis. Recusandae cum voluptates eum illum iste ratione. Molestias, doloremque exercitationem deserunt soluta labore praesentium quasi, eveniet alias assumenda, voluptatem quae ipsam illo? In a quibusdam suscipit, nesciunt dolore ad similique?',
		file: 'Catalog',
	},
	{
		name: 'E-Green Farm',
		img: 'Resources/Smart_farm.png',
		url: 'https://drive.google.com/file/d/1eWOQbSvxH_B0YkDs2rXZkFbZt-8cGSce/view?usp=drive_link', // Replace with actual URL
		icon: GiFruitBowl,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut ipsa quaerat illum? Sint, iste deleniti! Deleniti dolorem tenetur quo consectetur perspiciatis itaque accusamus mollitia! Illo voluptas porro vel nesciunt blanditiis. Recusandae cum voluptates eum illum iste ratione. Molestias, doloremque exercitationem deserunt soluta labore praesentium quasi, eveniet alias assumenda, voluptatem quae ipsam illo? In a quibusdam suscipit, nesciunt dolore ad similique?',
		file: 'Catalog',
	},
	{
		name: 'Smart Guard',
		img: '/Resources/Smart_guard.png',
		url: 'https://drive.google.com/file/d/1jyBQeO9dW9E_bSCYIAqWx0G8L7ky4iJr/view?usp=drive_link', // Replace with actual URL
		icon: AiFillSafetyCertificate,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut ipsa quaerat illum? Sint, iste deleniti! Deleniti dolorem tenetur quo consectetur perspiciatis itaque accusamus mollitia! Illo voluptas porro vel nesciunt blanditiis. Recusandae cum voluptates eum illum iste ratione. Molestias, doloremque exercitationem deserunt soluta labore praesentium quasi, eveniet alias assumenda, voluptatem quae ipsam illo? In a quibusdam suscipit, nesciunt dolore ad similique?',
		file: 'Catalog',
	},
	{
		name: 'Smart Guard Mobile-App',
		url: 'https://drive.google.com/file/d/1uICVqqcPN0MusqcUXxizORFUIj9VYTSH/view?usp=drive_link', // Replace with actual app link
		icon: ImMobile,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut ipsa quaerat illum? Sint, iste deleniti! Deleniti dolorem tenetur quo consectetur perspiciatis itaque accusamus mollitia! Illo voluptas porro vel nesciunt blanditiis. Recusandae cum voluptates eum illum iste ratione. Molestias, doloremque exercitationem deserunt soluta labore praesentium quasi, eveniet alias assumenda, voluptatem quae ipsam illo? In a quibusdam suscipit, nesciunt dolore ad similique?',
		file: 'Application',
	},
]

const DownloadPage = () => {
	return (
		<div className='w-full h-auto flex items-center justify-center flex-col lg:py-16 md:py-14 sm:py-12 py-10 lg:px-10 md:px-16 sm:px-6 px-4'>
			<h6 className='text-4xl flex items-center gap-5 font-medium text-gray-600 mb-6'>
				<GrDocumentStore className='text-gray-600' size={50} />
				Resources
			</h6>
			<RecourceList data={downloads} />
			{/* <div className='w-full h-auto flex items-start justify-center gap-x-4 gap-y-5 flex-wrap mb-10'>
				{downloads.map((item, index) => (
					<div key={index} className='flex flex-col items-center'>
						<a
							href={item.url}
							target='_blank'
							rel='noopener noreferrer'
							className='bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600'
						>
							{item.name}
						</a>
					</div>
				))}
			</div> */}
		</div>
	)
}

export default DownloadPage
