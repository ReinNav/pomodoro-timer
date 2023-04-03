import { useState } from 'react'
import "./App.css"
import Timer from "./components/Timer"
import Settings from './components/Settings'
import SettingsContext from './components/SettingsContext'

function App() {

  const [showSettings, setShowSettings] = useState(false);


  return (
      <main>
        <SettingsContext.Provider value={{
          showSettings,
          setShowSettings
        }}>
        {showSettings ? <Settings /> : <Timer />}
        </SettingsContext.Provider>
      </main>
  )
}

export default App
