import './App.css';
import React from 'react';
import Homepage from "./pages/Homepage"
import { Routes , Route} from 'react-router-dom';
import SearchPage from './Search/SearchPage';
import BusinessDetail from './Search/BusinessDetail'; // Yeni eklenen BusinessDetail bileşenini ekleyin
import RegisterForm from './pages/RegisterForm';
import { Toaster } from 'react-hot-toast';
import LoginForm from './pages/LoginForm';
import CardDetail from './Search/CardDetail';
import FooterDetail from './components/FooterDetail';


function App() {
  return (
   <div className='App'>
    <Routes>
      <Route index path='/' element={<Homepage/>} />
      <Route exact path='/search' element={<SearchPage/>} />
      <Route exact path='/business/:id' element={<BusinessDetail />} />  
      <Route exact path='/register' element={<RegisterForm/>} />
      <Route exact path='/login' element={<LoginForm/>} />
      <Route exact path='/post/:slug' element={<CardDetail/>} />
      <Route exact path='/footer-detail' element={<FooterDetail/>} />
    </Routes>
    <Toaster/>
   </div>
    
  );
}

export default App;
