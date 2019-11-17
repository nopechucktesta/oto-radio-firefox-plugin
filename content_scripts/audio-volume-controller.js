const muteButton = document.getElementById("my_mute")

browser.runtime.onMessage.addListener(({type, ...payload}) => {

    console.debug(`Got new ${type} message`)

    switch (type) {
        case "MUTE_OTO":
            muteButton.click()
            return Promise.resolve("$dummyValueToBypass$")

        default:
            throw Error(`Unknown message type: ${type}`)
    }
})

console.debug("Audio volume controller has been instantiated")
