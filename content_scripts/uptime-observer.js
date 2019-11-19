/**
 * @type {MutationObserverInit}
 */
const uptimeTimerObserverConfiguration = {
    childList: true,
}

const uptimeTimerContainer = document.getElementById("my_timer")

const uptimeTimerObserver = new MutationObserver(handleUptimeTimerMutation)
uptimeTimerObserver.observe(uptimeTimerContainer, uptimeTimerObserverConfiguration)

/**
 *
 * @param uptimeTimerMutation {MutationRecord}
 * @param observer {MutationObserver}
 * @return {Promise}
 */
function handleUptimeTimerMutation([uptimeTimerMutation], observer) {
    return browser.runtime.sendMessage({
        type: Mission.Feedback.Uptime,
        uptime: uptimeTimerMutation.addedNodes[0].wholeText,
    })
}

console.debug("Uptime observer has been instantiated")
