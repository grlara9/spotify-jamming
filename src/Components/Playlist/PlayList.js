import React,{useState} from "react";
import Style from './PlayList.module.css'
import Tracklist from "../Tracklist/TrackList";

function Playlist(props) {

  const[name, setName]= useState('New Playlist')

  const handleNameChange =(e)=>{
    setName(e.target.value)
    props.onNameChange(e.target.value)
  }

  return (
    <div className={Style.Playlist}>
      <input value={name} onChange={handleNameChange}/>
      {/* <!-- Add a TrackList component --> */}
      <Tracklist 
        tracks={props.playlistTracks}
        onRemove={props.onRemove}
        isRemoval={true}
      />
      <button className={Style['Playlist-save']} onClick={props.onSave}>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;