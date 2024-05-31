import React from "react";
import Styles from './TrackList.module.css';
import Track from '../Track/Track'

function Tracklist (props) { 
  console.log(props)
    return (
        <div className={Styles.TrackList}>
        {/* <!-- You will add a map method that renders a set of Track components  --> */
        props.userSearchResults.map((track) => (
          <Track 
          key={track.id} 
          track={track} 
          onAdd={props.onAdd} 
          onRemove={props.onRemove}
          isRemoval={props.isRemoval}
          />
        )) 
        }
      </div>
    );
}

export default Tracklist;