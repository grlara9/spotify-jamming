let accessToken;
const client_id="9181e23e73054430b3196a89a7b64f80";
const redirectUrl = "http://localhost:3000/callback";
const spotifyBaseUrl = 'https://api.spotify.com/v1';


const Spotify = {
    getAccessToken(){
        if (accessToken) return accessToken; 
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
      const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
      window.location = redirect;
    },
   
    async search(searchTerm) {
        accessToken = Spotify.getAccessToken();
        const url=`${spotifyBaseUrl}/search?q=${searchTerm}&type=track`;
        try{
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const jsonResponse = await response.json();
        
        if (jsonResponse.tracks.items) {
            return jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    title: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name
                };
            });
	    }
    }catch(error){
        console.log(error)
    }
    }


    }


export {Spotify} 