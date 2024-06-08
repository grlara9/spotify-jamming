import React from "react";
import Styles from './TrackList.module.css';
import Track from '../Track/Track'

function Tracklist ({ tracks, onAdd, onRemove, isRemoval }) { 

    return (
        <div className={Styles.TrackList}>
        {/* <!-- You will add a map method that renders a set of Track components  --> */
        tracks.map(track => (
          <Track
            key={track.id}
            track={track}
            onAdd={onAdd}
            onRemove={onRemove}
            isRemoval={isRemoval}
          />
        )) 
        }
      </div>
    );
}

export default Tracklist;