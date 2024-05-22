import React from "react";
import Styles from './TrackList.module.css';
import Track from '../Track/Track'
function Tracklist (props) { 
    return (
        <div className="TrackList">
        {/* <!-- You will add a map method that renders a set of Track components  --> */
        props.userSearchResults.map((track) => (
          <Track key={track.id} track={track} />
        ))
        }
      </div>
    );
}

export default Tracklist;