import { Routes, Route, Router } from 'react-router-dom';
import Home from './pages/Home';


export default function App() {
  return (
    <div>
        <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more when ready */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/team" element={<Team />} /> */}
      </Routes>    


    </div>
  )

}
