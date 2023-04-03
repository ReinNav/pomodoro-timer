import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import StartPauseButton from './StartPauseButton';
import SettingsButton from './SettingsButton'
import { useContext } from 'react';
import SettingsContext from './SettingsContext';

const red = '#f54e4e';
const orange = '#c75c0a'
const green = '#4aec8c';

function Timer() {
    const settingsInfo = useContext(SettingsContext);

    const percentage = 50;

    return (
        <div>
            <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles({
                textColor: '#fff',
                trailColor: 'rgb(255, 255, 255, .2)',
                })}/>

            <div id="buttons-container">
                <StartPauseButton />
                <SettingsButton onClick={() => settingsInfo.setShowSettings(true)}/>
            </div>   
        </div>
    )
}

export default Timer;