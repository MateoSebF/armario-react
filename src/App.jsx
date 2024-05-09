import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home';
import Wardrobe from './pages/Wardrobe/Wardrobe';
import Calendar from './pages/Calendar/Calendar';
import Community from './pages/Community/Community';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import FormGetClothing from './pages/Wardrobe/FormGetClothing/FormGetClothing';

function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}/>
        <Route path='/Wardrobe' element={<Wardrobe></Wardrobe>}/>
        <Route path='/Calendar' element={<Calendar></Calendar>}/>
        <Route path='/Community' element={<Community></Community>}/>
        <Route path='/Profile' element={<Profile></Profile>}/>
        <Route path='/login' element={<Login></Login>}/>
        <Route path='/register' element={<Register></Register>}/>      
        <Route path='/Wardrobe/FormGetClothing' element={<FormGetClothing></FormGetClothing>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
