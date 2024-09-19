import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { swiperData } from '../../DB/index'
import './Hero.css'

// import required modules
import { Navigation, Pagination } from 'swiper/modules'

const Hero = () => {
	const statistics = [
		{
			number: 200,
			title: 'Clients',
		},
		{
			number: 24,
			title: 'Projects',
		},
		{
			number: 112,
			title: 'Products',
		},
		{
			number: 8,
			title: 'Years experience',
		},
	]
	return (
		<>
			<div className='w-full h-auto'>
				{/* Swiper */}
				<Swiper
					spaceBetween={30}
					centeredSlides={true}
					loop={true}
					autoplay={{
						delay: 2500,
						disableOnInteraction: true,
					}}
					pagination={{
						clickable: true,
					}}
					navigation={false}
					modules={[Pagination, Navigation]}
					className='mySwiper w-full h-auto'
				>
					{swiperData.map(data => (
						<SwiperSlide
							key={data.id}
							className='w-full h-[100vh] relative'
							style={{
								backgroundImage: `url(${data.bgImg})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat',
							}}
						>
							{/* <div className='absolute w-full h-full bg-black/50 top-0 left-0 -z-10' /> */}
							<div className='relative h-full top-1/4 mx-2 flex flex-col lg:items-start md:items-start sm:items-center items-center z-10'>
								<h1 className='lg:text-7xl md:text-5xl sm:text-3xl text-3xl font-[700] w-3/5 bg-gradient-text text-transparent text-left p-0'>
									{/* {data.header} */}
								</h1>
								<div className='h-auto w-full flex justify-center flex-col gap-10 items-center my-5'>
									<p className='text-white text-lg text-center max-w-[800px] mt-10 ml-10'>
										{/* {data.desc} */}
									</p>
									{/* <SecondaryBtn className='lg:mt-10 md:mt-6 sm:mt-5 mt-4 lg:ml-10 md:ml-7 sm:ml-5 ml-4' /> */}
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				{/* Banner */}

				<div className='w-full bg-white/90 h-auto flex items-center lg:justify-between md:justify-between sm:justify-center justify-center lg:gap-7 md:gap-7 sm:gap:5 gap-5 lg:px-24 md:px-16 sm:px-6 px-6  mt-6 flex-wrap'>
					{/* === 1 === */}
					{statistics.map((item, index) => (
						<div
							key={index}
							className='group flex items-center justify-center flex-col lg:w-fit md:w-[48%] sm:w-[48%] w-full lg:py-6 md:py-7 sm:py-8 py-9 px-10 hover:bg-gray-200 rounded-md ease-out duration-700 cursor-pointer'
						>
							<h5 className='text-4xl text-indigo-500 group-hover:text-indigo-400 ease-out duration-700 font-semibold mb-2 uppercase'>
								{item.number}
							</h5>
							<p className='text-lg text-indigo-500 font-medium'>
								{item.title}
							</p>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export default Hero
