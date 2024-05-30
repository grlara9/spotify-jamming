import React from "react";
import Style from './PlayList.module.css'
import Tracklist from "../Tracklist/TrackList";

function Playlist(props) {
  const handleNameChange =(e)=>{
    props.onNameChange(e.target.value)
  }

  return (
    <div className={Style.Playlist}>
      <input defaultValue={"New Playlist"} onChange={handleNameChange}/>
      {/* <!-- Add a TrackList component --> */}
      <Tracklist 
        userSearchResults={props.playlistTracks}
        onRemove={props.onRemove}
        isRemoval={true}
      />
      <button className={Style['Playlist-save']} onClick={props.onSave}>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;