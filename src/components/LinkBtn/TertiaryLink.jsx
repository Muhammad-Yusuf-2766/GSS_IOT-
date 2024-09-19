import React from 'react'
import { Link } from 'react-router-dom'

const TertiaryLink = ({ link, children, className, isNested }) => {
	return isNested ? (
		<a
			href={`${link}`}
			target='_blank'
			rel='noopener noreferrer'
			className={`text-xl text-white border hover:bg-indigo-600/50 hover:border-white/60 font-medium px-3 rounded flex items-center justify-center gap-y-2 gap-x-1 ease-out duration-500 ${className}`}
		>
			{children}
		</a>
	) : (
		<Link
			to={link}
			className={`text-base text-white border hover:bg-indigo-600/50 hover:border-white/60 font-medium px-3 py-1.5 rounded flex items-center gap-x-1 ease-out duration-500 ${className}`}
		>
			{children}
		</Link>
	)
}

export default TertiaryLink
