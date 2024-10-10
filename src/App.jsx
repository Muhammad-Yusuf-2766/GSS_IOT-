import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import ScrollToTop from './components/Card/window.scroll' // Kept your local import
import ActiveProducts from './Dashboard/Components/Home_comp/ActiveProducts'
import DashboardLayout from './Dashboard/Components/Layout'
import AddClient from './Dashboard/Pages/Add_client'
import AddProduct from './Dashboard/Pages/Add_product'
import Clients from './Dashboard/Pages/Clients'
import Main from './Dashboard/Pages/Home'
import NodeDisplay from './Dashboard/Pages/NodeDisplay'
import Products from './Dashboard/Pages/Products'
import Users from './Dashboard/Pages/Users'
import Layout from './Layout'
import CommunityPage from './pages/Community'
import Home from './pages/Home/Home'
import DownloadPage from './pages/Recources'
import ServicesPage from './pages/Services'
import DetailedService from './pages/Services/Detailed_service'
import LoginPage from './pages/Signup & Login/Login' // Kept your local import
import SignupPage from './pages/Signup & Login/Signup' // Kept your local import

function App() {
	// const navigate = useNavigate('/')
	// const handleLogoutRequest = async () => {
	// 	try {
	// 		const res = await logOutRequest()
	// 		await toast.success('Log Out Successfully !', {
	// 			onClick: () => {
	// 				navigate('/')
	// 			},
	// 		})

	// 		return res
	// 	} catch (err) {
	// 		console.log(err)
	// 		sweetFailureProvider(Definer.general_err1)
	// 	}
	// }
	return (
		<div className='bg-white min-h-screen'>
			{/* <MainContextProvider> */}
			<Router>
				<ScrollToTop /> {/* Kept your local change */}
				<Routes>
					{/* Routes for Users */}
					<Route element={<Layout />}>
						{/* <Navbar /> */}
						<Route path='' element={<Home />} />
						<Route path='/recources' element={<DownloadPage />} />
						<Route path='/services' element={<ServicesPage />} />
						<Route path='/services/:id' element={<DetailedService />} />
						<Route path='/community' element={<CommunityPage />} />
						<Route path='/signup' element={<SignupPage />} />
						<Route path='/login' element={<LoginPage />} />
					</Route>

					{/* Routes for Admin */}
					<Route path='/dashboard' element={<DashboardLayout />}>
						<Route path='' element={<Main />} />
						<Route path='add-client' element={<AddClient />} />
						<Route path='add-product' element={<AddProduct />} />
						<Route path='clients' element={<Clients />} />
						<Route path='users' element={<Users />} />
						<Route path='products' element={<Products />} />
						<Route path='node_display' element={<NodeDisplay />} />
						<Route path='statistics-list' element={<ActiveProducts />} />
					</Route>
				</Routes>
			</Router>
			{/* </MainContextProvider> */}
		</div>
	)
}

export default App
