import React from 'react'
import Style from './SearchBar.module.css'
function SearchBar(){
    return(
        <div className={Style.SearchBar}>
            <input placeholder='Enter A Song, Album, or Artist' />
            <button className={Style.SearchButton}>SEARCH</button>
        </div>
    );
}

export default SearchBar;