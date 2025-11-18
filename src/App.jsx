import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' 
import { AppHeader } from './AppHeader'
 
 
export function App() {

  const [cupOrCone, setCupOrCone] = useState("cone")
  
  const [flavour, setFlavour] = useState("שוקולד")



  return (
    <> 
    <AppHeader></AppHeader>
  
      <button onClick={() =>  setCupOrCone("cup")}>
         ספל
        </button>
      <button onClick={() =>  setCupOrCone("cone")}>
          גביע
      </button>
      <p>
        הגשה ב
        {cupOrCone === "cone" ? "גביע": "ספל" }
      </p>
        <button onClick={() =>  setFlavour("שוקולד")}>
        שוקולד
        </button>
      <button onClick={() =>  setFlavour("וניל")}>
        וניל
      </button>
          <button onClick={() =>  setFlavour("תות")}>
        תות
      </button>
      <p>

       גלידה בטעם
       
        {flavour}
      </p>


      <div className="card">
      
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}


