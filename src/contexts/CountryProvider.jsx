import React, { useState, createContext, useContext } from 'react';

const CountryContext = createContext()

const CountryProvider = ({ children }) => {
    const [country, setCountry] = useState('')
    const [searchName, setSearchName] = useState('')
    const [filterRegion, setFilterRegion] = useState('')

    const getCountry = (name) => {
        setCountry(name)
    }

    const searchCountry = (name) => {
        setSearchName(name)
    }

    const clearCountry = () => {
        setSearchName('')
        setCountry('')
    }

    const filterCountry = (region) => {
        setFilterRegion(region)
    }

    return (
        <CountryContext.Provider value={{ country, searchName, filterRegion, getCountry, searchCountry, clearCountry, filterCountry }}>
            {children}
        </CountryContext.Provider>
    )
}

const useCountry = () => {
    const context = useContext(CountryContext)

    if (context === undefined) {
        throw new Error('useCountry must be used within a CountryProvider')
    }

    return context
}

export { CountryProvider, useCountry }