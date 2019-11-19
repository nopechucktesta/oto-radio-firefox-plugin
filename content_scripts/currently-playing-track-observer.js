/**
 * @type {MutationObserverInit}
 */
const currentlyPlayingTrackInfoObserverConfiguration = {
    childList: true,
}

const [currentlyPlayingTrackInfoContainer] =
    document.getElementsByClassName("my_info")

const currentlyPlayingTrackInfoObserver = new MutationObserver(handleCurrentlyPlayingTrackInfoMutation)
currentlyPlayingTrackInfoObserver
    .observe(currentlyPlayingTrackInfoContainer, currentlyPlayingTrackInfoObserverConfiguration)

/**
 *
 * @param currentlyPlayingTrackInfoMutation {MutationRecord}
 * @param observer {MutationObserver}
 * @return {Promise}
 */
function handleCurrentlyPlayingTrackInfoMutation([currentlyPlayingTrackInfoMutation], observer) {
    return browser.runtime.sendMessage({
        type: Mission.Feedback.ActiveTrack,
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
