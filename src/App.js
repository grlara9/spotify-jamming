import React, {useEffect, useState} from "react";
import Style from './App.module.css';
import SearchBar from './Components/SearchBar/SearchBar'
import SearchResults from './Components/SearchResult/SearchResults';
import Playlist from './Components/Playlist/PlayList'
import { Spotify } from "./util/Spotify/Spotify";
function App () {

  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlaylistName] = useState('New Playlist')
  const [playlistTracks, setPlaylistTracks] = useState([])
  const [accessToken, setAccessToken] = useState(null)

  useEffect(()=>{
    const token = Spotify.getAccessToken();
    setAccessToken(token);
  }, []);

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
    const trackURIs = playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    });
  }
  
  const search = (term) => {
    Spotify.search(term).then((result) => setSearchResults(result));
    
  }
    return (
        <div>
        <h1>Ja<span className={Style.highlight}>mmm</span>ing</h1>
        {!accessToken ? (
        <a href={`https://accounts.spotify.com/authorize?client_id=${Spotify.clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${Spotify.redirectUri}`}>
          Login to Spotify
        </a>
      ) : (
        <div className={Style.App}>
          {/* <!-- Add a SearchBar component --> */}
          <SearchBar 
            onSearch={search}
          />
          
            <div className={Style['App-playlist']}>
            {/* <!-- Add a SearchResults component --> */
           <SearchResults searchResults={searchResults} onAdd={addTrack} />
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
        )};
      </div>
    );
}

export default App;