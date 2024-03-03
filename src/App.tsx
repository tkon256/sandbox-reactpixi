import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Error404 } from './pages/error'
import { Home } from './pages/home'
import { Sample1 } from './pages/sample1'
import { Sample2 } from './pages/sample2'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route path="/" element={<Home />} />
          <Route path="/samples/1" element={<Sample1 />} />
          <Route path="/samples/2" element={<Sample2 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
