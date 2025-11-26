import { useState } from 'react'
import './App.css'
import { Button, Card } from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Patient Management System</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}> Click me </Button>
        <Card shadow>
          <p>Card Content {count}</p>
        </Card>
      </div>
    </>
  )
}

export default App
