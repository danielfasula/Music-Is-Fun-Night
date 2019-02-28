export default class Song {
    constructor(song) {
        this.title = song.title || song.trackName
        this.albumArt = song.albumArt || song.artworkUrl60.replace(/60x60/g, "250x250")
        this.artist = song.artist || song.artistName
        this.album = song.album || song.collectionName
        this.price = song.price || song.collectionPrice
        this.preview = song.preview || song.previewUrl
        this.trackId = song.trackId
    }
}