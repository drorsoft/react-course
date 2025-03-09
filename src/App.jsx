
import { useState } from 'react'

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

      <AppHeader />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <IceCream serveType={serveType} />
      </div>
      <div className="card">
        <button onClick={() => toggleServeType()}>
          {serveType === 'cone' ? 'גביע' : 'כוס'}
        </button>

      </div>

    </>
  )
}

export default App
