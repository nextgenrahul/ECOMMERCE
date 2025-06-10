import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
     <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
