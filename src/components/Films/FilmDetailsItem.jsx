import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../../firebase'
import YouTube from 'react-youtube'

import Modal from '../UI/Modal'
import Button from '../UI/Button'
import SectionTitle from '../UI/SectionTitle'

import './FilmDetailsItem.css'

const FilmDetailsItem = () => {
	const [film, setFilm] = useState(null)
	const [showTrailerModal, setShowTrailerModal] = useState(false)
	const { id } = useParams()

	useEffect(() => {
		const fetchFilm = async () => {
			try {
				const snapshot = await database.ref(`films/${id}`).once('value')
				const filmData = snapshot.val()
				if (filmData) {
					setFilm({ id, ...filmData })
				}
			} catch (error) {
				console.error('Błąd podczas pobierania filmu:', error)
			}
		}

		fetchFilm()
	}, [id])

	const handleTrailerButtonClick = () => {
		setShowTrailerModal(true)
	}

	const handleCloseModal = () => {
		setShowTrailerModal(false)
	}

	return (
		<div className='details-item wrapper'>
			{film && (
				<>
					<SectionTitle className='details-item__title' title={film.title} />
					<img src={film.heroImage} alt={film.describe} className='details-item__img' />
					<div className='details-item__box'>
						<div className='details-item__box-left'>
							<div className='details-item__box-left-data'>
								<p className='details-item__box-left-data-title'>Premiera</p>
								<p className='details-item__box-left-data-value'>{film.releaseDate}</p>
							</div>
							<div className='details-item__box-left-data'>
								<p className='details-item__box-left-data-title'>Produkcja</p>
								<p className='details-item__box-left-data-value'>{film.country}</p>
							</div>
							<div className='details-item__box-left-data'>
								<p className='details-item__box-left-data-title'>Bariera wiekowa</p>
								<p className='details-item__box-left-data-value'>{film.ageRating} lat</p>
							</div>
							<div className='details-item__box-left-data'>
								<p className='details-item__box-left-data-title'>Czas trwania</p>
								<p className='details-item__box-left-data-value'>{film.duration} minut</p>
							</div>
						</div>
						<div className='details-item__box-right'>
							<p className='details-item__box-right-title'>{film.title}</p>
							<p className='details-item__box-right-genre'>{film.genre}</p>
							<p className='details-item__box-right-description'>{film.description}</p>
						</div>
					</div>
					{showTrailerModal && (
						<Modal onClose={handleCloseModal}>
							<YouTube className='details-item__trailer' videoId={film.trailerLink} />
						</Modal>
					)}
					<Button className='details-item__button' onClick={handleTrailerButtonClick}>
						Zobacz zwiastun
					</Button>
				</>
			)}
		</div>
	)
}

export default FilmDetailsItem
