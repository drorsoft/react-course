import { useState } from 'react'
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
    <div className="w-screen h-screen flex flex-col  ">
      <AppHeader />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <IceCream serveType={serveType} />
      </div>
      <div className="bg-background-main flex-1">
        <button onClick={() => toggleServeType()}>
          {serveType === 'cone' ? 'גביע' : 'כוס'}
        </button>
      </div>
    </div>
  )
}

export default App
