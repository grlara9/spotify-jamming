import React from "react";
import Style from './PlayList.module.css'

function Playlist() {
  return (
    <div className={Style.Playlist}>
      <input defaultValue={"New Playlist"} />
      {/* <!-- Add a TrackList component --> */}
      <button className={Style.Playlist-save}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}

export default Playlist;