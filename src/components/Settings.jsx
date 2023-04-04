import React, { useContext } from 'react';
import { useState, useEffect } from 'react'
import Select from 'react-select';
import SettingsContext from './SettingsContext';
import BackButton from './BackButton';

const pomodoroLengthOptions = [
    { value: 25, label: '25 Minutes' },
    { value: 35, label: '35 Minutes' },
    { value: 45, label: '45 Minutes' }
];

const shortBreakLengthOptions = [
    { value: 5, label: '5 Minutes' },
    { value: 10, label: '10 Minutes' }
];

const longBreakLengthOptions = [
    { value: 15, label: '15 Minutes' },
    { value: 20, label: '20 Minutes' },
    { value: 25, label: '25 Minutes' }
];


function Settings() {
    const settingsInfo = useContext(SettingsContext);

    useEffect(() => {
        const storedPomodoroLength = localStorage.getItem('myPomodoroLength');
        if (storedPomodoroLength) {
            settingsInfo.setSelectedPomodoroLength(JSON.parse(storedPomodoroLength));
        }
    }, []);

    useEffect(() => {
        const storedShortBreak = localStorage.getItem('myShortBreak');
        if (storedShortBreak) {
            settingsInfo.setSelectedShortBreak(JSON.parse(storedShortBreak));
        }
    }, []);

    useEffect(() => {
        const storedLongBreak = localStorage.getItem('myLongBreak');
        if (storedLongBreak) {
            settingsInfo.setSelectedLongBreak(JSON.parse(storedLongBreak));
        }
    }, []);

    const handlePomodoroChange = (selectedPomodoroLength) => {
        settingsInfo.setSelectedPomodoroLength(selectedPomodoroLength);
        localStorage.setItem('myPomodoroLength', JSON.stringify(selectedPomodoroLength));
        /* console.log(`Option pomodoro selected:`, selectedPomodoroLength); */
    };

    const handleShortBreakChange = (selectedShortBreak) => {
        settingsInfo.setSelectedShortBreak(selectedShortBreak);
        localStorage.setItem('myShortBreak', JSON.stringify(selectedShortBreak));
    };

    const handleLongBreakChange = (selectedLongBreak) => {
        settingsInfo.setSelectedLongBreak(selectedLongBreak);
        localStorage.setItem('myLongBreak', JSON.stringify(selectedLongBreak));
    };



    return (
        <section>
            <div className='back-btn-container'>
                <BackButton onClick={() => settingsInfo.setShowSettings(false)}/>
            </div>

            <div style={{ textAlign: 'left' }}>
                <label>Pomodoro length:</label>
                <Select
                    value={settingsInfo.selectedPomodoroLength}
                    onChange={handlePomodoroChange}
                    options={pomodoroLengthOptions}
                />

                <label>Short break length:</label>
                <Select
                    value={settingsInfo.selectedShortBreak}
                    onChange={handleShortBreakChange}
                    options={shortBreakLengthOptions}
                />

                <label>Long break length:</label>
                <Select
                    value={settingsInfo.selectedLongBreak}
                    onChange={handleLongBreakChange}
                    options={longBreakLengthOptions}
                />
            </div>
        </section>
            
    );
}

export default Settings;