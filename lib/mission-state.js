class MissionState {
    /**
     *
     * @param playlistListened {PlaylistListened}
     * @param uptime {string}
     */
    constructor(playlistListened, uptime = "00:00:00") {
        this.playlistListened = playlistListened
        this.uptime = uptime
    }

    /**
     *
     * @return {Promise}
     */
    get maybeOtoTab() {
        return browser.tabs
            .query({})
            .then(tabs => {
                const otoTab = tabs.find(it => it.url === "https://oto-radio.ru/")
                return otoTab ? Promise.resolve(otoTab) : Promise.reject()
            })
    }

    /**
     *
     * @return {Promise}
     */
    get state() {
        return this.maybeOtoTab.then(otoTab => ({
            otoTab,
            tracksListened: [...this.playlistListened.tracksListened],
            uptime: this.uptime,
        }))
    }
}

class PlaylistListened {
    /**
     *
     * @param onTrackCapture {function(CapturedTrack)}
     * @param tracksListened {Array<CapturedTrack>}
     */
    constructor(onTrackCapture, tracksListened = []) {
        this.onTrackCapture = onTrackCapture
        this.tracksListened = tracksListened
    }

    /**
     *
     * @returns {CapturedTrack}
     */
    get currentlyPlayingTrack() {
        return this.tracksListened[this.tracksListened.length - 1]
    }

    get isEmpty() {
        return this.tracksListened.length === 0
    }

    /**
     *
     * @param trackSignature {string}
     * @return {Promise}
     */
    captureTrackIfNotListenedYet(trackSignature) {
        if (this.isEmpty || trackSignature !== this.currentlyPlayingTrack.signature) {
            const capturedTrack = new CapturedTrack(trackSignature, new Date())
            this.tracksListened.push(capturedTrack)
            return this.onTrackCapture(capturedTrack)
        } else {
            return Promise.reject()
        }
    }
}

class CapturedTrack {
    /**
     *
     * @param signature {string}
     * @param capturedAt {Date}
     */
    constructor(signature, capturedAt) {
        this.signature = signature
        this.capturedAt = capturedAt
    }
}
