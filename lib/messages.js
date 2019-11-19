const Control = {
    Mute: "MUTE",
}

const Feedback = {
    ActiveTrack: "ACTIVE_TRACK",
    Uptime: "UPTIME",
}

const Report = {
    TrackCapture: "TRACK_CAPTURE",
}

const Request = {
    State: "STATE",
}

const Mission = {
    Control,
    Feedback,
    Report,
    Request,
}

Object.freeze(Control)
Object.freeze(Feedback)
Object.freeze(Report)
Object.freeze(Request)
Object.freeze(Mission)
