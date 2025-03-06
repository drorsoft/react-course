
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AppHeader } from './components/AppHeader'
import { IceCream } from './components/IceCream'

function App() {
  const [serveType, setServeType] = useState('cone') // cone | cup
  function toggleServeType() {
    if (serveType === 'cone') {
      setServeType('cup')
    } else {
      setServeType('cone')
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <AppHeader />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <IceCream serveType={serveType} />
      </div>
      <div className="card">
        <button onClick={() => toggleServeType()}>
          served in a {serveType}
        </button>

      </div>

    </>
  )
}

export default App
