import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Home from './pages/home'
import { NavBar } from './components/customer/navbar'
import { Catalog } from './pages/customer/catalog'
import { Toaster } from 'react-hot-toast'
import { PartFormHandler } from './pages/owner/parts-form-handler'

const queryClient = new QueryClient()

function App() {
  return (
    <div className='min-h-screen'>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Toaster
            position="top-right"
            reverseOrder={true}
          />
          <NavBar />

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/catalog" element={<Catalog />}></Route>
            <Route path='/partform' element={<PartFormHandler />}></Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  )
}

export default App
