import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import StartPauseButton from './StartPauseButton';
import SettingsButton from './SettingsButton'
import { useContext, useState, useEffect, useRef } from 'react';
import SettingsContext from './SettingsContext';

const red = '#f54e4e';
const orange = '#c75c0a'
const green = '#4aec8c';

function Timer() {
    const settingsInfo = useContext(SettingsContext);
    settingsInfo.selectedPomodoroLength = Number.isInteger(settingsInfo.selectedPomodoroLength) ? settingsInfo.selectedPomodoroLength : settingsInfo.selectedPomodoroLength.value;

    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work');
    const [secondsLeft, setSecondsLeft] = useState(0);

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function switchMode() {
        const nextMode =  modeRef.current === 'work' ? 'break' : 'work';
        const nextSeconds =  (nextMode === 'work' ? settingsInfo.selectedPomodoroLength : settingsInfo.selectedShortBreak) * 60;

        setMode(nextMode);
        modeRef.current = nextMode;

        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;
    }

    function initTimer() {
        secondsLeftRef.current = settingsInfo.selectedPomodoroLength * 60;
        setSecondsLeft(settingsInfo.selectedPomodoroLength * 60);
    }

    function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(() => {

        initTimer();

        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }

            if (secondsLeftRef.current === 0) {
                return switchMode();
            }

            tick();
        }, 1000);

        return () => clearInterval(interval);

    }, [settingsInfo]);

    const totalSeconds = mode === 'work' ? settingsInfo.selectedPomodoroLength * 60 : settingsInfo.selectedShortBreak * 60;
    const percentage = Math.round(secondsLeft / totalSeconds * 100);

    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if (seconds < 10 ) seconds ='0'+seconds;


    return (
        <div>
            <CircularProgressbar value={percentage} text={`${minutes}:${seconds}`} styles={buildStyles({
                textColor: '#fff',
                pathColor: mode === 'work' ? red : green,
                trailColor: 'rgb(255, 255, 255, .2)',
                })}/>

            <div id="buttons-container">
                {isPaused 
                ? <StartPauseButton label="Start" onClick={() => { setIsPaused(false), isPausedRef.current = false; }}/> 
                : <StartPauseButton label="Pause" onClick={() => { setIsPaused(true), isPausedRef.current = true; }}/>}
                <SettingsButton onClick={() => settingsInfo.setShowSettings(true)}/>
            </div>   
        </div>
    )
}

export default Timer;