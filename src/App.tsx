import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RootLayout from './components/layout/RootLayout'

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  )
}

export default App