import React from "react";
import Style from './PlayList.module.css'
import Tracklist from "../Tracklist/TrackList";

function Playlist(props) {
  return (
    <div className={Style.Playlist}>
      <input defaultValue={"New Playlist"} />
      {/* <!-- Add a TrackList component --> */}
      <Tracklist 
        userSearchResults={props.playlistTracks}
        onRemove={props.onRemove}
        isRemoval={true}
      />
      <button className={Style['Playlist-save']}>SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;