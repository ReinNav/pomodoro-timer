import { useState } from 'react'
import "./App.css"
import Timer from "./components/Timer"
import Settings from './components/Settings'
import SettingsContext from './components/SettingsContext'

function App() {

  const [showSettings, setShowSettings] = useState(false);
  const [selectedPomodoroLength, setSelectedPomodoroLength] = useState(25);
  const [selectedShortBreak, setSelectedShortBreak] = useState(5);
  const [selectedLongBreak, setSelectedLongBreak] = useState(20);


  return (
    <main>
      <SettingsContext.Provider value={{
        showSettings,
        selectedPomodoroLength,
        selectedShortBreak,
        selectedLongBreak,
        setShowSettings,
        setSelectedPomodoroLength,
        setSelectedShortBreak,
        setSelectedLongBreak
      }}>
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </main>
  )
}

export default App
