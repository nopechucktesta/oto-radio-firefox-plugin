browser.runtime.onMessage.addListener(({ type, ...payload }) => {

    console.debug(`Got new ${type} message`)

    switch (type) {
        case Mission.Feedback.ActiveTrack:
            return missionState.playlistListened
                .captureTrackIfNotListenedYet(payload["currentlyPlayingTrack"])

        case Mission.Feedback.Uptime:
            missionState.uptime = payload["uptime"]
            return

        case Mission.Request.State:
            return missionState.state

        default:
            throw Error(`Unknown message type: ${type}`)
    }
})

const playlistListened = new PlaylistListened(dispatchTrackCaptureMessage)
const missionState = new MissionState(playlistListened)

/**
 *
 * @param capturedTrack {CapturedTrack}
 * @returns {Promise}
 */
function dispatchTrackCaptureMessage(capturedTrack) {
    return browser.runtime
        .sendMessage({ type: Mission.Report.TrackCapture, capturedTrack })
}

console.debug("Mission control center has been instantiated")
