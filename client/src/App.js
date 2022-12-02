import { useSelector } from 'react-redux';
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Navbar from './components/Navbar';
import BlogDetails from './pages/BlogDetails';
import CreateBlog from './pages/CreateBlog';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const {currentUser} = useSelector((state) => state.auth)

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={currentUser ? <Home /> : <Navigate to ='/auth/login' />} />
        <Route path='/create' element={<CreateBlog />} />
        <Route path='/blog/:id' element={<BlogDetails />} />
        <Route path='/auth/register' element={<Register />} />
        <Route path='/auth/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
