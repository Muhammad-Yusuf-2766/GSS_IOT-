import { Link, Outlet } from 'react-router-dom'

const DashboardLayout = () => {
	return (
		<div className=''>
			<header>{/* <h1>Admin Dashboard</h1> */}</header>
			<div style={{ display: 'flex' }}>
				<aside style={{ width: '250px', height: '100vh' }}>
					<ul>
						<li>
							<Link to='/dashboard/'>Manage Products</Link>
						</li>
						<li>
							<Link to='/dashboard/products'>Manage Products</Link>
						</li>
						<li>
							<Link to='/dashboard/users'>Manage Users</Link>
						</li>
					</ul>
				</aside>
				<header>
					<h1>Admin Dashboard</h1>
				</header>
				<main style={{ marginLeft: '250px', padding: '20px' }}>
					<Outlet />
				</main>
			</div>
		</div>
	)
}

export default DashboardLayout
