import React, { useState, createContext, useContext } from 'react';

const CountryContext = createContext()

const CountryProvider = ({ children }) => {
    const [country, setCountry] = useState('')
    const [filterRegion, setFilterRegion] = useState('')


    return (
        <CountryContext.Provider value={{ country, filterRegion, setCountry, setFilterRegion }}>
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