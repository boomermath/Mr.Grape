module.exports =
    class {
        constructor(player) {
            this._player = player;
            this._songs = []
            this._position = 0;
        }

        get _repeatMode() {
            return this._player.settings.repeatMode;
        }

        get songs() {
            return this._songs;
        }

        get position() {
            return this._position;
        }

        get currentSong() {
            return this._songs[this._position];
        }

        set songs(value) {
            this._songs = value;
        }

        _updateStream() {
            if (!this.currentSong) return this._player.disconnect();
            this._player._stream(this.currentSong);
        }

        add(...songs) {
            songs.forEach(song => this._songs.push(song));
        }

        shift() {
            if (this._repeatMode !== 1) this._position += 1;
            if (this._repeatMode === 2 && this._songs.length === this._position) this._position = 1;
            this._updateStream()
        }

        skip(toTrack) {
            this._position = toTrack;
            this._updateStream();
        }

        remove(pos) {
            if (pos === this._position) this.shift();
            return this._songs.splice(pos, 1)[0];;
        }

        reset() {
            this._songs = [];
            this._position = 0;
        }
    }