import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  console.log('重新渲染了')
  useEffect(() => {
    fetch('/admin/prodattr/getAllAttr?attrType=2', {
      headers: {
        TENANT_ID: '1',
        Authorization: 'Bearer 167f9c3d-7086-4980-9328-ac288cd08a30',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(`res`, res)
      })
    return () => {}
  }, [])
  return (
    <div className='App'>
      <header className='App-header'>
        <p>Hello Vite + React!</p>
        <p>
          <button onClick={() => setCount((count) => count + 1)}>count is: {count}</button>
        </p>
      </header>
    </div>
  )
}

export default App
