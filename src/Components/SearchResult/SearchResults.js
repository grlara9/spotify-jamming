import React from "react";
import Style from './SearchResults.module.css'
import Tracklist from "../Tracklist/TrackList";

function SearchResults ({ searchResults, onAdd }) {
    return (
        <div className={Style.SearchResults}>
        {/* <!-- Add a TrackList component --> */
        <Tracklist 
        tracks={searchResults} onAdd={onAdd} isRemoval={false}
        />
        }
      </div>
        );
}

export default SearchResults;