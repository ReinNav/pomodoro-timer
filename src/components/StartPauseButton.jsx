import React from "react"

function StartPauseButton(props) {
    return (
        <button {...props} className="start-pause-btn">{props.label}</button>
    )
}

export default StartPauseButton;