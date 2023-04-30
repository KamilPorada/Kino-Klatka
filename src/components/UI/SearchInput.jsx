import './SearchInput.css'
import React, { useState } from 'react'

const SearchInput = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (event) => {
    const { value } = event.target
    setSearchTerm(value)
    handleSearch(value)
  }

  return (
    <>
      <div className='search-input'>
        <i className='fa-solid fa-magnifying-glass'></i>
        <input
          type='text'
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
    </>
  )
}

export default SearchInput