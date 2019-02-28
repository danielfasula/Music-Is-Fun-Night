import ItunesService from "./itunes-service.js";
import Song from "../../models/Song.js";
//Private
const itunesService = new ItunesService()

function drawSongs() {
  //changes button back to GET MUSIC once songs are loaded
  document.querySelector('#get-music-button').textContent = 'GET MUSIC'
  console.log(itunesService.Songs)
  let template = ''
  let songs = itunesService.Songs
  songs.forEach(song => {
    template += `
  <div class="card col-6">
    <img src="${song.albumArt}" alt="" srcset="" class="card-img-top">
    <h4>${song.artist} : ${song.title}</h4>
    <p>$${song.price}</p>
    <audio controls>
    <source src="${song.preview}" type="audio/mpeg">
    </audio>
    <button class="btn btn-outline-info btn-light" onclick="app.controllers.itunesCtrl.addToPlaylist('${song.trackId}')">Add to my Playlist</button>
  </div>
    `
  })
  document.querySelector("#songs").innerHTML = template;
}

function drawMyPlaylist(myPlaylist) {
  let template = ''
  myPlaylist.forEach(song => {
    template += `
    <div class="card col-6">
    <img src="${song.albumArt}" alt="" srcset="" class="card-img-top">
    <h4>${song.artist} : ${song.title}</h4>
    <p>$${song.price}</p>
    <button class="btn btn-danger" onclick="app.controllers.itunesCtrl.removeFromPlaylist('${song._id}')">Remove From Playlist</button>
    <audio controls>
     <source src="${song.preview}" type="audio/mpeg">
    </audio>
  </div>
    `
  })
  document.querySelector('#my-playlist').innerHTML = template
}


//PUBLIC
class ItunesController {
  constructor() {
    itunesService.getMyPlaylist(drawMyPlaylist)
  }




  //DO NOT MODIFY THIS METHOD
  getMusic(e) {
    e.preventDefault();
    var artist = e.target.artist.value;
    //changes the button to loading while songs load
    document.querySelector('#get-music-button').textContent = 'LOADING....'
    itunesService.getMusicByArtist(artist, drawSongs)
  }

  addToPlaylist(trackId) {
    itunesService.addToPlaylist(drawMyPlaylist, trackId)
    console.log('added to playlist!')
  }

  removeFromPlaylist(trackId) {
    itunesService.removeFromPlaylist(drawMyPlaylist, trackId)
  }
}


export default ItunesController