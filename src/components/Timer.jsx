import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import StartPauseButton from './StartPauseButton';
import SettingsButton from './SettingsButton';
import StopButton from './StopButton';
import { useContext, useState, useEffect, useRef } from 'react';
import SettingsContext from './SettingsContext';

const red = '#f54e4e';
const orange = '#c75c0a'
const green = '#4aec8c';

function Timer() {
    const settingsInfo = useContext(SettingsContext);
    
    // Differentiate when value is Option object from React.select
    settingsInfo.selectedPomodoroLength = Number.isInteger(settingsInfo.selectedPomodoroLength) ? settingsInfo.selectedPomodoroLength : settingsInfo.selectedPomodoroLength.value;
    settingsInfo.selectedShortBreak = Number.isInteger(settingsInfo.selectedShortBreak) ? settingsInfo.selectedShortBreak : settingsInfo.selectedShortBreak.value;
    settingsInfo.selectedLongBreak = Number.isInteger(settingsInfo.selectedLongBreak) ? settingsInfo.selectedLongBreak : settingsInfo.selectedLongBreak.value;

    const [isPaused, setIsPaused] = useState(true);
    const [isStarted, setIsStarted] = useState(false);
    const [mode, setMode] = useState('work');

    const [secondsLeft, setSecondsLeft] = useState(0);

    // Refs avoid re-render in useEffect()
    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);
    const countRef = useRef(settingsInfo.pomodoroCount);
    const isStartedRef = useRef(isStarted);

    function switchMode() {
        if (modeRef.current === 'work') {
            settingsInfo.setPomodoroCount(settingsInfo.pomodoroCount + 1);
            countRef.current++;
        }
        console.log(settingsInfo.pomodoroCount, modeRef.current, countRef.current);

        const countIsForLongBreak = (settingsInfo.pomodoroCount > 0 && countRef.current % 3 === 0);
        
        const nextMode = modeRef.current === 'work' && (!countIsForLongBreak) ? 'shortBreak' 
        : modeRef.current === 'work' && (countIsForLongBreak) ? 'longBreak' 
        : 'work'; 

        const nextSeconds =  (nextMode === 'work' ? settingsInfo.selectedPomodoroLength : nextMode === 'shortBreak' ? settingsInfo.selectedShortBreak : settingsInfo.selectedLongBreak) * 60;

        setMode(nextMode);
        modeRef.current = nextMode;

        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;
    }

    function initTimer() {
        secondsLeftRef.current = (modeRef.current === 'work' ? settingsInfo.selectedPomodoroLength : modeRef.current === 'shortBreak' ? settingsInfo.selectedShortBreak : settingsInfo.selectedLongBreak) * 60;
        setSecondsLeft(secondsLeftRef.current);
    }

    function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    // Reset timer when clicking stop
    function returnToOriginal() {
        const originalSeconds =  (modeRef.current === 'work' ? settingsInfo.selectedPomodoroLength : modeRef.current === 'shortBreak' ? settingsInfo.selectedShortBreak : settingsInfo.selectedLongBreak) * 60;
        setSecondsLeft(originalSeconds);
        secondsLeftRef.current = originalSeconds;
        console.log(settingsInfo.pomodoroCount);
    }

    // Start timer
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
        }, 1);

        return () => clearInterval(interval);

    }, [settingsInfo]);

    const totalSeconds = (mode === 'work' ? settingsInfo.selectedPomodoroLength : mode === 'shortBreak' ? settingsInfo.selectedShortBreak : settingsInfo.selectedLongBreak) * 60;
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
                {isPaused ? 
                <div className='buttons-paused-container'>
                    <StartPauseButton label="Start" onClick={() => { setIsPaused(false), isPausedRef.current = false, setIsStarted(true), isStartedRef.current = true; }}/>
                    {isStartedRef.current  ? <StopButton label="Stop" onClick={() => { 
                        returnToOriginal();
                        isStartedRef.current = false;
                        }}/> 
                        : null}
                </div>
                : <StartPauseButton label="Pause" onClick={() => { setIsPaused(true), isPausedRef.current = true; }}/>}
                <SettingsButton onClick={() => settingsInfo.setShowSettings(true)}/>
            </div>   
        </div>
    )
}

export default Timer;