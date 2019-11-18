class AudioVolumeController {
    constructor(muteButton) {
        this.muteButton = muteButton
    }

    mute() {
        this.muteButton.click()
        return Promise.resolve("$dummyValueToBypass$")
    }
}

const muteButton = document.getElementById("my_mute")
const audioVolumeController = new AudioVolumeController(muteButton)

browser.runtime.onMessage.addListener(({type, ...payload}) => {

    console.debug(`Got new ${type} message`)

    if (type === Messages.MissionControlCenter.MuteOtoRadio) {
        return audioVolumeController.mute()
    } else {
        throw Error(`Unknown message type: ${type}`)
    }
})

console.debug("Audio volume controller has been instantiated")
