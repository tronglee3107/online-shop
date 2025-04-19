
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/home'
import { Toaster } from 'react-hot-toast';
function App() {

  const isSellerPath = useLocation().pathname.includes("seller");
  return (
    <div>
      {isSellerPath ? null : <Navbar />}
      <Toaster />
      <div className={`${isSellerPath ? "" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
