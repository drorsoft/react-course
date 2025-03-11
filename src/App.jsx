import { useState } from 'react'
import { AppHeader } from './components/AppHeader'
import { IceCream } from './components/IceCream'
import { TailwindExamples } from './examples/TailwindExamples'

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
      <TailwindExamples />
      <AppHeader />
      <div className='flex flex-col items-center justify-center   h-64'>
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
