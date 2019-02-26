import Song from "../../models/Song.js";

let _songs = []
//these should be songs from the bcw-server
let _playlist = []

//DO NOT MODIFY
class ItunesService {
  get Songs() {
    return _songs.map(s => new Song(s))
  }

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
}



export default ItunesService