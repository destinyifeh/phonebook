
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home'
import Index from './components/contacts/Index'
import Show from './components/contacts/Show'
import Edit from './components/contacts/Edit'
import Forgot from './components/users/Forgot';
import Reset from './components/users/Reset';
import NotFoundPage from './components/NotFoundPage';
import ResetCode from './components/users/ResetCode';
import UserIndex from './components/users/Index';
import {currentUser} from './components/Redux/userSlice';


function App() {
    
       
  return (
    <div>
       <BrowserRouter>
       <Routes>
         <Route path='/' exact element={<Home/>}/>
         <Route path='/contacts' element={<> {currentUser? <Index/> : <Home/> } </>}/>
         <Route path='/contact/:id' element={<Show/>}/>
         <Route path='/edit/contact/:id' element={<Edit/>}/>
         <Route path='/user/reset-password/:id' element={<Reset/>}/>
         <Route path='/user/forgot-password' element={<Forgot/>}/>
         
         <Route path='/user-list' element={<UserIndex/>}/>

         <Route path='/user/password-code' element={<ResetCode/>}/>

         <Route path='*' element={<NotFoundPage/>}/>
       </Routes>
       </BrowserRouter>
       <ToastContainer className="text-center" position="top-center"/> 
    </div>
  );
}

export default App;
