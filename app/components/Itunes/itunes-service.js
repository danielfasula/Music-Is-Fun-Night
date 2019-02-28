import Song from "../../models/Song.js";

let _songs = []
let _selectedSong = {}
let _playlist = []

// @ts-ignore
let songAPI = axios.create({
  baseURL: "https://bcw-sandbox.herokuapp.com/api/danielfasula/songs",
  timeout: 3000
})

class ItunesService {
  get Songs() {
    return _songs.map(s => new Song(s))
  }

  getMyPlaylist(drawMyPlaylist) {
    songAPI.get('/')
      .then(res => {
        console.log(res.data)
        let myPlaylist = res.data.data
        drawMyPlaylist(myPlaylist)
      })
      .catch(function (err) {
        console.error(err)
      })
  }


  //-------------------------DO NOT MODIFY--------------------------------
  getMusicByArtist(artist, callback) {
    var url = 'https://itunes.apple.com/search?callback=?&term=' + artist;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        _songs = res.results.map(s => new Song(s))
        callback()
      })
      .catch(err => console.log(err))
  }
  // ----------------------------------------------------------------------


  addToPlaylist(drawMyPlaylistCallback, trackId) {
    let likedSong = _songs.find(song => song.trackId == trackId)
    let track = _playlist.find(track => track.title == likedSong.title)
    if (track) {
      alert("Song already in Playlist!")
      return
    }
    if (likedSong) {
      songAPI.post('/', likedSong)
        .then(res => {
          console.log(res)
          _playlist.push(res.data.data)
          drawMyPlaylistCallback([..._playlist])
        })
        .catch(function (err) {
          console.error(err)
        })
    }
  }

  removeFromPlaylist(drawMyPlaylistCallback, trackId) {
    songAPI.delete(trackId)
      .then(res => {
        console.log(res)
        //envoke get all songs in my playlist method
        this.getMyPlaylist(drawMyPlaylistCallback)
      })
  }
}



export default ItunesService