import React from 'react'
import AnalogClock from './components/AnalogClock'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">アナログ時計</h1>
      <AnalogClock />
    </div>
  )
}

export default App
