import React from "react"

function StopButton(props) {
    return (
        <button {...props} className="timer-control-btn">{props.label}</button>
    )
}

export default StopButton;