const playlist = document.getElementById("playlist")
const muteButton = document.getElementById("mute")
const audibleIcon = document.getElementById("audible")
const mutedIcon = document.getElementById("muted")

browser.runtime.sendMessage({ type: Mission.Request.State })
    .then(({ otoTab, tracksListened, uptime }) => {
        otoTab["audible"]
            ? audibleIcon.hidden = false
            : mutedIcon.hidden = false
        muteButton.addEventListener("click", () =>
            browser.tabs.sendMessage(otoTab.id, { type: Mission.Control.Mute })
                .then(toggleMuteButton))
        tracksListened.reduce(
            (playlistUnderConstruction, nextCapturedTrack) =>
                introduceNewTrack(playlistUnderConstruction, nextCapturedTrack),
            playlist
        )
    })
    .catch(() => console.warn("No state"))

function toggleMuteButton() {
    [audibleIcon.hidden, mutedIcon.hidden] = [mutedIcon.hidden, audibleIcon.hidden]
}

browser.runtime.onMessage.addListener(({ type, capturedTrack }) => {
    if (type === Mission.Report.TrackCapture) {
        introduceNewTrack(playlist, capturedTrack)
    }
})

/**
 *
 * @param playlist {HTMLElement}
 * @param track {CapturedTrack}
 * @return {HTMLElement}
 */
function introduceNewTrack(playlist, track) {

    const { signature, capturedAt } = track

    const trackSignature = signature.trim()
    const [capturedAtTime] = capturedAt.toTimeString().split(" ")
    const newTrackContainerId = `${signature}-${capturedAtTime}`

    const newTrackContainer = document.createElement("li")
    newTrackContainer.id = newTrackContainerId
    newTrackContainer.innerHTML = `<div class="track-signature">${trackSignature}</div><div class="captured-at">${capturedAtTime.slice(0, capturedAtTime.lastIndexOf(":"))}</div>`
    newTrackContainer.addEventListener("click", () => navigator.clipboard.writeText(trackSignature))

    playlist.insertBefore(newTrackContainer, playlist.firstChild)

    return playlist
}

console.debug("Mission control panel has been instantiated")
