import React from "react";
import Style from './SearchResults.module.css'
import Tracklist from "../Tracklist/TrackList";
function SearchResults (props) {
    return (
        <div className={Style.SearchResults}>
        {/* <!-- Add a TrackList component --> */
        <Tracklist userSearchResults={props.userSearchResults}/>
        }
      </div>
        );
}

export default SearchResults;