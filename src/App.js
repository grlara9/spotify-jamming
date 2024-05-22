import React, {useState} from "react";
import Style from './App.module.css';
import SearchResults from './Components/SearchResult/SearchResults'
function App () {
  const [searchResults, setSearchResults] = useState([
    {
    name: 'example track name1', 
    artist: 'example track artist 1', 
    album: 'example track album 1'
    },
    {
      name: 'example track name2', 
      artist: 'example track artist 2', 
      album: 'example track album 2'
    },
    {
      name: 'example track name3', 
      artist: 'example track artist 3', 
      album: 'example track album 3'
    },
    {
      name: 'example track name3', 
      artist: 'example track artist 3', 
      album: 'example track album 3'
    }
    
  ])
    return (
        <div>
        <h1>Ja<span className={Style.highlight}>mmm</span>ing</h1>
        <div className={Style.App}>
          {/* <!-- Add a SearchBar component --> */}
          
          
            <div className={Style['App-playlist']}>
            {/* <!-- Add a SearchResults component --> */
            <SearchResults userSearchResults={searchResults}/>
            }
            
            {/* <!-- Add a Playlist component --> */}
          </div>
        </div>
      </div>
        );
}

export default App;