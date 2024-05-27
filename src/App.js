import React, {useState} from "react";
import Style from './App.module.css';
import SearchResults from './Components/SearchResult/SearchResults';
import Playlist from './Components/Playlist/PlayList'
function App () {
  const [searchResults, setSearchResults] = useState([
    {
    name: 'example track name1', 
    artist: 'example track artist 1', 
    album: 'example track album 1',
    id: 1,
    },
    {
      name: 'example track name2', 
      artist: 'example track artist 2', 
      album: 'example track album 2',
      id: 2,
    },
    {
      name: 'example track name3', 
      artist: 'example track artist 3', 
      album: 'example track album 3',
      id: 3,
    },
    {
      name: 'example track name4', 
      artist: 'example track artist 3', 
      album: 'example track album 3',
      id: 4,
    }
  ])

  const [playlistName, setPlaylistName] = useState('Example Playlist Name')
  const [playlistTracks, setPlaylistTracks] = useState([
    {
      name: 'Example Playlist Name 1',
      artist: 'Example Playlist Artist 1',
      album: 'Example Playlist Album 1',
      id: 34
    },
    {
      name: 'Example Playlist Name 2',
      artist: 'Example Playlist Artist 2',
      album: 'Example Playlist Album 2',
      id: 24
    },
    {
      name: 'Example Playlist Name 3',
      artist: 'Example Playlist Artist 3',
      album: 'Example Playlist Album 3',
      id: 35
    }
  ])

  const addTrack = (track) =>{
    const existingTrack = playlistTracks.some(item => track.id === item.id )
    existingTrack ? console.log('Track already exist') : setPlaylistTracks([...playlistTracks, track])
  }

  const removeTrack = (track) =>{
    const removeTrack = playlistTracks.filter((item) => track.id !== item.id)
    setPlaylistTracks(removeTrack)
  }
  
  
    return (
        <div>
        <h1>Ja<span className={Style.highlight}>mmm</span>ing</h1>
        <div className={Style.App}>
          {/* <!-- Add a SearchBar component --> */}
          
          
            <div className={Style['App-playlist']}>
            {/* <!-- Add a SearchResults component --> */
            <SearchResults 
            userSearchResults={searchResults} 
            onAdd={addTrack}
            />
            }
            
            {/* <!-- Add a Playlist component --> */}
            {<Playlist 
            playlistName={playlistName} 
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            />}
          </div>
        </div>
      </div>
        );
}

export default App;