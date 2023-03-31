import './RepertoireItem.css'

const RepertoireItem = props => {
	return (
		<>
			<div className='item'>
				<img className='item__img' src={props.src} alt={props.alt} />
				<div className='item__shadow'>
					<div className='item__shadow-button'>
						<p className='item__shadow-button-text'>Zobacz więcej</p>
					</div>
				</div>
			</div>
			<p className='name'>{props.title}</p>
		</>
	)
}

export default RepertoireItem
