import { CircleUserRound } from 'lucide-react'
import React from 'react'
import { MembersData } from '../../DB'
import MemberCard from '../../components/Card/member.card'

const CommunityPage = () => {
	return (
		<div>
			<div className='w-full h-auto flex items-center justify-center flex-col lg:py-16 md:py-14 sm:py-12 py-10 lg:px-14 md:px-16 sm:px-6 px-4 hover:'>
				<h6 className='text-3xl font-medium text-gray-200 flex items-center gap-x-2 mb-6'>
					<CircleUserRound
						size={'70px'}
						strokeWidth='1'
						className='text-indigo-500'
					/>
					Our Company Members
				</h6>
				<div className='w-[80%] h-auto flex items-center justify-center lg:gap-x-8 md:gap-x-6 sm:gap-x-4 gap-x-3 lg:gap-y-8 md:gap-y-6 sm:gap-y-4 gap-y-3 flex-wrap mb-10'>
					{/* Let's display them throught loop */}
					{MembersData.map(data => (
						<MemberCard data={data} key={data.id} />
					))}
				</div>
			</div>
		</div>
	)
}

export default CommunityPage
