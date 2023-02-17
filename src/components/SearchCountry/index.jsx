import React, { useState } from 'react';
import styles from './styles.module.scss'
import { useCountry } from '../../contexts/CountryProvider';

const SearchForm = () => {
    const [search, setSearch] = useState('')

    const { searchCountry } = useCountry()

    const handleSearch = (e) => {
        e.preventDefault()

        if (!search.length) {
            alert('Enter country name')
            return
        }

        searchCountry(search)
        setSearch('')
    }

    return (
        <>
            <form className={styles.searchForm} onSubmit={handleSearch}>
                <input
                    type='text'
                    placeholder="Search for a country..."
                    className={styles.searchForm__input}
                    value={search}
                    onChange={e => setSearch(e.target.value)} />
                <button className={styles.searchForm__btn} type="submit"></button>
            </form>
        </>
    );
}

export default SearchForm;
