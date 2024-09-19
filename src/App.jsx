import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import DashboardLayout from './Dashboard/Components/Layout'
import AddClient from './Dashboard/Pages/Add_client'
import AddProduct from './Dashboard/Pages/Add_product'
import Clients from './Dashboard/Pages/Clients'
import Main from './Dashboard/Pages/Home'
import Products from './Dashboard/Pages/Products'
import Layout from './Layout'
import AboutPage from './pages/About'
import CommunityPage from './pages/Community'
import Home from './pages/Home/Home'
import ServicesPage from './pages/Services'
import DetailedService from './pages/Services/Detailed_service'

function App() {
	return (
		<div className='bg-white min-h-screen'>
			<Router>
				<Routes>
					{/* Routes for Users */}
					<Route element={<Layout />}>
						<Route path='' element={<Home />} />
						<Route path='/about' element={<AboutPage />} />
						<Route path='/services' element={<ServicesPage />} />
						<Route path='/Services/:id' element={<DetailedService />} />
						<Route path='/community' element={<CommunityPage />} />
					</Route>

					{/* Routes for Admin */}
					<Route path='/dashboard' element={<DashboardLayout />}>
						<Route path='' element={<Main />} />
						<Route path='add-client' element={<AddClient />} />
						<Route path='add-product' element={<AddProduct />} />
						<Route path='clients' element={<Clients />} />
						<Route path='products' element={<Products />} />
					</Route>
				</Routes>
			</Router>
		</div>
	)
}

export default App
