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
      <div className='flex flex-col items-center justify-center   h-64'>
        <IceCream serveType={serveType} />
      </div>
      <div className="bg-background-main flex-1 flex flex-col justify-start items-center p-4">
        <div id='button-container' className='flex flex-col '>


          <button className={`p-2 w-12 bg-background-accent text-black hover:ring-1 ring-purple-700 rounded`} onClick={() => toggleServeType()}>
            {serveType === 'cone' ? 'גביע' : 'כוס'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
