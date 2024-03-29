import React from "react"

function StartPauseButton(props) {
    return (
        <button {...props} className="timer-control-btn">{props.label}</button>
    )
}

export default StartPauseButton;