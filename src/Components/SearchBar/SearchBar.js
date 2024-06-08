import React, {useState} from 'react'
import Style from './SearchBar.module.css'
function SearchBar(props){

    const [term, setTerm] = useState('')

    const handleTermChange =(e) =>{
        setTerm(e.target.value)
    }

    const search = () =>{
        props.onSearch(term)
    }


    return(
        <div className={Style.SearchBar}>
            <input placeholder='Enter A Song, Album, or Artist' onChange={handleTermChange}/>
            <button className={Style.SearchButton} onClick={search}>SEARCH</button>
        </div>
    );
}

export default SearchBar;