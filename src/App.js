import React, {useState} from "react";
import Style from './App.module.css';
import SearchBar from './Components/SearchBar/SearchBar'
import SearchResults from './Components/SearchResult/SearchResults';
import Playlist from './Components/Playlist/PlayList'
import { Spotify } from "./util/Spotify/Spotify";
function App () {
  const [searchResults, setSearchResults] = useState([])

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

  const updatePlaylistName = (name) =>{
    setPlaylistName(name)
  }

  function savePlaylist() {
    const trackURIs = playlistTracks.map((t) => t.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      updatePlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }
  
 async function search(term) {
      const results = await Spotify.search(term);
      setSearchResults(results);
    }
    return (
        <div>
        <h1>Ja<span className={Style.highlight}>mmm</span>ing</h1>
        <div className={Style.App}>
          {/* <!-- Add a SearchBar component --> */}
          <SearchBar 
            onSearch={search}
          />
          
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
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
            />}
          </div>
        </div>
      </div>
        );
}

export default App;