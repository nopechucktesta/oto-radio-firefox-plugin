/**
 * @type {MutationObserverInit}
 */
const observerConfiguration = {
    childList: true,
}

const [currentlyPlayingTrackInfoContainer] =
    document.getElementsByClassName("my_info")

const observer = new MutationObserver(handleCurrentlyPlayingTrackInfoMutation)
observer.observe(currentlyPlayingTrackInfoContainer, observerConfiguration)

/**
 *
 * @param currentlyPlayingTrackInfoMutation {MutationRecord}
 * @param observer {MutationObserver}
 * @return {Promise}
 */
function handleCurrentlyPlayingTrackInfoMutation([currentlyPlayingTrackInfoMutation], observer) {
    return browser.runtime.sendMessage({
        type: "CURRENTLY_PLAYING_TRACK",
        currentlyPlayingTrack: findCurrentlyPlayingTrackContainer(
            currentlyPlayingTrackInfoMutation.addedNodes
        ).innerText,
    })
}

/**
 *
 * @param nodeList {NodeList}
 * @return {Node}
 */
function findCurrentlyPlayingTrackContainer(nodeList) {
    return [...nodeList.values()]
        .find(node => node.className === "info-now-plaing-song")
}

console.debug("Currently playing track observer has been instantiated")
