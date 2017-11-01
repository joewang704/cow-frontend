import React from 'react'
import WeekView from './WeekView'
import SettingsModal from './SettingsModal/'
import Logout from './Logout'

const App = () => {
  return (
    <div id="app" style={{
      backgroundColor: '#F5F3EE',
    }}>
      <WeekView />
      <SettingsModal />
      <Logout />
    </div>
  )
}

export default App
