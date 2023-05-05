import React, { useState } from 'react'
import Button from '../UI/Button'
import NewRepertoireItem from './NewRepertoireItem'
import { database } from '../../firebase'

import './NewRepertoire.css'

const NewRepertoire = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [formData, setFormData] = useState({
		data: '',
		openingTime: '',
		breakTime: '',
	})

	const [isFormValid, setIsFormValid] = useState(false)
	const [isAddingFilm, setIsAddingFilm] = useState(false)

	const [repertoireItems, setRepertoireItems] = useState([]) // Nowy stan dla elementów NewRepertoireItem
	const [selectedFilm, setSelectedFilm] = useState(null)
	const [disabledButton, setDisabledButton] = useState(false)

	const handleInputChange = event => {
		const { name, value } = event.target
		setFormData(prevData => ({ ...prevData, [name]: value }))
	}

	const validateForm = () => {
		const { data, openingTime, breakTime } = formData
		const dateRegex = /^\d{4}-\d{2}-\d{2}$/
		const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
		const isDataValid = dateRegex.test(data)
		const isOpeningTimeValid = timeRegex.test(openingTime)
		const isBreakTimeValid = Number(breakTime) > 0
		const isBreakTimeFilled = breakTime !== ''

		const isFormValid = isDataValid && isOpeningTimeValid && isBreakTimeValid && isBreakTimeFilled
		setIsFormValid(isFormValid)
	}

	const handleAddFilm = event => {
		event.preventDefault()
		setIsAddingFilm(true)
		// Dodanie nowego elementu NewRepertoireItem do tablicy
		const { openingTime, breakTime } = formData
		const newFilmItem = {
			startTime: repertoireItems.length === 0 ? openingTime : calculateStartTime(breakTime, selectedFilm.duration),
			selectedFilm: null,
		}
		setRepertoireItems(prevItems => [...prevItems, newFilmItem])
		setDisabledButton(true)
	}

	const handleSelectedFilm = film => {
		setSelectedFilm(film)
		setDisabledButton(false)
		setRepertoireItems(prevItems => {
			const updatedItems = [...prevItems]
			updatedItems[repertoireItems.length - 1] = {
				...updatedItems[repertoireItems.length - 1],
				selectedFilm: film.title,
			}
			return updatedItems
		})
	}

	const calculateStartTime = (breakTime, prevFilmDuration) => {
		const lastItem = repertoireItems[repertoireItems.length - 1]
		const lastStartTime = lastItem.startTime

		const [lastHours, lastMinutes] = lastStartTime.split(':').map(Number)

		const lastStartTimeInMinutes = lastHours * 60 + lastMinutes + Number(breakTime) + Number(prevFilmDuration)

		const finalHours = Math.floor(lastStartTimeInMinutes / 60) % 24
		const finalMinutes = lastStartTimeInMinutes % 60

		return `${String(finalHours).padStart(2, '0')}:${String(finalMinutes).padStart(2, '0')}`
	}

	const saveRepertoire = async event => {
		event.preventDefault()
		try {
			setIsSubmitting(true)
			const { data } = formData

			// Zapis danych do Firebase Realtime Database
            await database.ref(`repertoire/${data}`).push(repertoireItems)

			setIsSubmitting(false)
			setErrorMessage('')
			setFormData({ data: '', openingTime: '', breakTime: '' })
			setRepertoireItems([])
			setSelectedFilm(null)
			setDisabledButton(false)
		} catch (error) {
			setIsSubmitting(false)
			setErrorMessage('Wystąpił błąd podczas zapisywania repertuaru.')
			console.error(error)
		}
	}

	const submittingContent = (
		<p className='new-repertoire__submitting'>
			Proszę czekać...
			<br />
			Trwa tworzenie repertuaru!
		</p>
	)

	return (
		<>
			<form className='new-repertoire'>
				{errorMessage && <div className='new-repertoire__error'>{errorMessage}</div>}
				{isSubmitting && submittingContent}
				{!isSubmitting && (
					<>
						<div className='new-repertoire__fields'>
							<label className='new-repertoire__fields-label new-repertoire__fields-label--half'>
								Data:
								<input
									type='date'
									name='data'
									value={formData.data}
									onChange={handleInputChange}
									onBlur={validateForm}
									disabled={isAddingFilm}
								/>
							</label>
							<label className='new-repertoire__fields-label new-repertoire__fields-label--half'>
								Godzina otwarcia kina:
								<input
									type='time'
									name='openingTime'
									value={formData.openingTime}
									onChange={handleInputChange}
									onBlur={validateForm}
									disabled={isAddingFilm} // Dodany atrybut disabled
								/>
							</label>
							<label className='new-repertoire__fields-label new-repertoire__fields-label--half'>
								Przerwa między seansami:
								<input
									type='number'
									name='breakTime'
									placeholder='[min]'
									value={formData.breakTime}
									onChange={handleInputChange}
									onKeyUp={validateForm}
									disabled={isAddingFilm} // Dodany atrybut disabled
								/>
							</label>
						</div>
						<Button
							className='new-repertoire__button-add'
							disabled={repertoireItems.length === 0 ? !isFormValid : disabledButton}
							onClick={handleAddFilm}>
							Dodaj film
						</Button>
						<div className='new-repertoire__items'>
							{repertoireItems.map((item, index) => (
								<NewRepertoireItem key={index} startTime={item.startTime} selectedFilm={handleSelectedFilm} />
							))}
						</div>
						<div className='new-repertoire__buttons'>
							<Button>Anuluj</Button>
							<Button disabled={disabledButton} onClick={saveRepertoire}>
								Zapisz
							</Button>
						</div>
					</>
				)}
			</form>
		</>
	)
}

export default NewRepertoire
