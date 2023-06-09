import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import RootLayout from './Pages/Root'
import HomePage from './Pages/HomePage'
import PricePage from './Pages/PricePage'
import ShowRepertoirePage from './Pages/RepertoirePage'
import TicketReservationPage from './Pages/TicketsReservationPage'
import ShowPromotionsPage from './Pages/PromotionsPage'
import MyTicketsPage from './Pages/MyTicketsPage'
import SettingsPage from './Pages/SettingsPage'
import SignInPage from './Pages/SignInPage'
import SignUpPage from './Pages/SignUpPage'
import EmployeeHomePage from './Pages/EmployeePages/EmployeeHomePage'
import FilmsPage from './Pages/EmployeePages/FilmsPage'
import FilmDetailsPage from './Pages/EmployeePages/FilmDetailsPage'
import RepertoirePage from './Pages/EmployeePages/RepertoirePage'
import PromotionPage from './Pages/EmployeePages/PromotionsPage'
import TicketPage from './Pages/EmployeePages/TicketPage'
import AuthProvider from './contexts/AuthContext'

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'prices',
				element: <PricePage />,
			},
			{
				path: 'showrepertoire',
				element: <ShowRepertoirePage />,
			},
			{
				path: 'mytickets',
				element: <MyTicketsPage />,
			},
			{
				path: 'ticketsreservation',
				element: <TicketReservationPage />,
			},
			{
				path: 'showpromotions',
				element: <ShowPromotionsPage />,
			},
			{
				path: 'settings',
				element: <SettingsPage />,
			},
			{
				path: 'signin',
				element: <SignInPage />,
			},
			{
				path: 'signup',
				element: <SignUpPage />,
			},
			{
				path: 'employee',
				element: <EmployeeHomePage />,
			},
			{
				path: 'films',
				element: <FilmsPage />,
			},
			{
				path: 'films/:id',
				element: <FilmDetailsPage />,
			},
			{
				path: 'repertoire',
				element: <RepertoirePage />,
			},
			{
				path: 'promotions',
				element: <PromotionPage />,
			},
			{
				path: 'tickets',
				element: <TicketPage />,
			},
		],
	},
])

function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	)
}

export default App
