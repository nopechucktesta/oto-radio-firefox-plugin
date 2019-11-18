class MissionControlPanel {
    get maybeOtoTab() {
        return browser.tabs
            .query({})
            .then(tabs => tabs.find(it => it.url === "https://oto-radio.ru/"))
    }

    mute() {
        this.maybeOtoTab.then(otoTab =>
            browser.tabs
                .sendMessage(otoTab.id, { type: Messages.MissionControlCenter.MuteOtoRadio }))
        return this
    }
}

const missionControlPanel = new MissionControlPanel()

const muteButton = document.getElementById("oto-mute")
muteButton.addEventListener("click", () => missionControlPanel.mute())

console.debug("Mission control panel has been instantiated")
