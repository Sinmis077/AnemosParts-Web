import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Home from './pages/home'
import { NavBar } from './components/navbar'
import { Catalog } from './pages/catalog'

const queryClient = new QueryClient()

function App() {
  return (
    <div className='min-h-screen'>
      <QueryClientProvider client={queryClient}>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/catalog" element={<Catalog />}></Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  )
}

export default App
