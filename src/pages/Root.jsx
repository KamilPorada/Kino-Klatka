import { Fragment, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

import MainNavigation from '../components/MainNavigation'
import EmployeeNavigation from '../components/EmployeeNavigation'
import Footer from '../components/Footer'
import { NavLink, useNavigate } from 'react-router-dom'

function RootLayout() {
	const { isEmployee, currentUser } = useAuth()
	const [navigation, setNavigation] = useState(null)
	const [footer, setFooter] = useState(null)

	useEffect(() => {
		if (isEmployee) {
			setNavigation(<EmployeeNavigation />)
			setFooter(null)
		} else {
			setNavigation(<MainNavigation />)
			setFooter(<Footer />)
		}
		if(!currentUser){
			setNavigation(<MainNavigation />)
			setFooter(<Footer />)
		}
	}, [isEmployee, currentUser])

	return (
		<>
			{navigation}
			<main>
				<Outlet />
			</main>
			{footer}
		</>
	)
}

export default RootLayout
