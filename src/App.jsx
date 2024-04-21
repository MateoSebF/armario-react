import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Wardrobe from './components/pages/Wardrobe';
import Calendar from './components/pages/Calendar';
import Community from './components/pages/Community';
import Profile from './components/pages/Profile';

function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}/>
        <Route path='/Wardrobe' element={<Wardrobe></Wardrobe>}/>
        <Route path='/Calendar' element={<Calendar></Calendar>}/>
        <Route path='/Community' element={<Community></Community>}/>
        <Route path='/Profile' element={<Profile></Profile>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
