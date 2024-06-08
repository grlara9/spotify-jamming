// src/util/Spotify.js
const clientId = '27a3ce32ca414d73bb6facda2ca9af6a';
const redirectUri = 'https://jamming-musicplayer.netlify.app';
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresInMatch) {
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', { headers: headers })
      .then(response => response.json())
      .then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ name: name })
        })
          .then(response => response.json())
          .then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({ uris: trackUris })
            });
          });
      });
  }
};

export {Spotify};

/*
let accessToken;
const client_id="9181e23e73054430b3196a89a7b64f80";
const spotifyBaseUrl = 'https://api.spotify.com/v1';
const redirectUri = "http://localhost:3000/callback";
//const redirectUri = "https://jamming-musicplayer.netlify.app";//


const Spotify = {
    getAccessToken(){
        if (accessToken) return accessToken; 
        console.log(accessToken)
        // extract access token from URL
        const tokenInURL= window.location.href.match(/access_token=([^&]*)/);

        // extract expiry time from URL
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

         // Second check for the access token
    if (tokenInURL && expiryTime) {
        // setting access token and expiry time variables
        accessToken = tokenInURL[1];
        const expiresIn = Number(expiryTime[1]);
  
        // Setting the access token to expire at the value for expiration time
        window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
        // clearing the url after the access token expires
        window.history.pushState("Access token", null, "/");
        return accessToken;
      }
  
      // Third check for the access token if the first and second check are both false
      //const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
      const redirect = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=playlist-modify-public playlist-modify-private&redirect_uri=${redirectUri}`;
      window.location = redirect;
    },
   
    search(term) {
      accessToken = Spotify.getAccessToken();
      return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          if (!jsonResponse) {
            console.error("Response error");
          }
          console.log(jsonResponse)
          return jsonResponse.tracks.items.map((t) => ({
            id: t.id,
            name: t.name,
            artist: t.artists[0].name,
            album: t.album.name,
            uri: t.uri,
          }));
        });
    },

    /*
    async search(searchTerm) {
        accessToken = Spotify.getAccessToken();
        //const url=`${spotifyBaseUrl}/search?q=${searchTerm}&type=track`;
        const url=`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;
        try{
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const jsonResponse = await response.json();

      return jsonResponse.data.tracks.items.map((track) => ({
        id: track.id,
        title: track.name,
        artist: track.artists[0].name,
        album: track.album.name
      }))
        /*
        if (jsonResponse.data.tracks.items) {
            return jsonResponse.data.tracks.items.map(track => {
                return {
                    id: track.id,
                    title: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name
                };
            });
	    }
  
    }
    catch(error)
    {
        console.log(error)
    }
    },


    savePlaylist(name, trackUris) {
        if (!name || !trackUris) return;
        const aToken = Spotify.getAccessToken();
        const header = { Authorization: `Bearer ${aToken}` };
        let userId;
        return fetch(`https://api.spotify.com/v1/me`, { headers: header })
          .then((response) => response.json())
          .then((jsonResponse) => {
            userId = jsonResponse.id;
            let playlistId;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
              headers: header,
              method: "post",
              body: JSON.stringify({ name: name }),
            })
              .then((response) => response.json())
              .then((jsonResponse) => {
                playlistId = jsonResponse.id;
                return fetch(
                  `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                  {
                    headers: header,
                    method: "post",
                    body: JSON.stringify({ uris: trackUris }),
                  }
                );
              });
          });
      },

    }


export {Spotify} 
*/