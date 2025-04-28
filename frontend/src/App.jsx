import { useState } from 'react'
import Home from './home'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex items-center justify-center h-screen  p-4'>
      <Home />
    </div>


  )
}

export default App
