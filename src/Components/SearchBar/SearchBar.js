import React, {useState} from 'react'
import Style from './SearchBar.module.css'
function SearchBar(props){

    const [search, setSearch] = useState('')

    const passTerm = () =>{
        props.onSearch(search)
    }

    const handleTermChange =(e) =>{
        setSearch(e.target.value)
    }

    return(
        <div className={Style.SearchBar}>
            <input placeholder='Enter A Song, Album, or Artist' onChange={handleTermChange}/>
            <button className={Style.SearchButton} onClick={passTerm}>SEARCH</button>
        </div>
    );
}

export default SearchBar;