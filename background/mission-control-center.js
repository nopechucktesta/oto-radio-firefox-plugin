browser.runtime.onMessage.addListener(({ type, ...payload }) => {

    console.debug(`Got new ${type} message`)

    switch (type) {
        case "CURRENTLY_PLAYING_TRACK":
            playlistListened.captureTrackIfNotListenedYet(payload["currentlyPlayingTrack"])
            return

        default:
            throw Error(`Unknown message type: ${type}`)
    }
})

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
     * @return {PlaylistListened}
     */
    captureTrackIfNotListenedYet(trackSignature) {
        if (this.isEmpty || trackSignature !== this.currentlyPlayingTrack.signature) {
            const capturedTrack = new CapturedTrack(trackSignature, new Date())
            this.tracksListened.push(capturedTrack)
            this.onTrackCapture(capturedTrack)
        }
        return this
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

const playlistListened = new PlaylistListened(dispatchCaptureTrackNotification)

/**
 *
 * @param capturedTrack {CapturedTrack}
 * @returns {Promise}
 */
function dispatchCaptureTrackNotification(capturedTrack) {
    return browser.notifications.create({
        type: "basic",
        title: capturedTrack.signature,
        message: `Captured at ${capturedTrack.capturedAt}`
    })
}
