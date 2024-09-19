import ActiveProducts from '../Components/Home_components/ActiveProducts'
import Clinets from '../Components/Home_components/ClientsCard'
import MemberCard from '../Components/Home_components/MemberCard'
import Products from '../Components/Home_components/Products'
import ProjectStatistics from '../Components/Home_components/ProjectStatistics'

import Users from '../Components/Home_components/UsersCard'

const Home = () => {
	return (
		<div className='p-5'>
			<h1 className='leading-none text-3xl font-bold text-gray-700 pb-2 mb-5'>
				Company Statistics
			</h1>
			<div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
				<Users />
				<Clinets />
				<Products />
				{/* <MemberCard /> */}
			</div>
			<div className='w-full h-auto mt-5 mb-5'>
				<ProjectStatistics />
			</div>
			<div className='flex flex-col space-y-5'>
				<h1 className='leading-none text-3xl font-bold text-gray-700 pb-2 mb-5'>
					Company Members
				</h1>
				<MemberCard />
				<h1 className='leading-none text-3xl font-bold text-gray-700 pb-2 mb-5'>
					Active Clients
				</h1>
				<ActiveProducts />
			</div>
		</div>
	)
}

export default Home
