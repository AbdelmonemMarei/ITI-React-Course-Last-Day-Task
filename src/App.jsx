
import './App.css'
import NavbarComponent from './components/NavbarComponent'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import About from './pages/About'
import NotFound from './pages/NotFound'
import AuthProvider from './Auth/AuthProvider'
import Login from './pages/Login'
import PrivateRoute from './Auth/PrivateRoute'
import Register from './pages/Register'


function App() {

  return (
    <div className='container-fluid '>
            <AuthProvider>
              <NavbarComponent/>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/product/:id" element={<ProductDetails/>}/>
                  <Route path="/cart" element={<Cart/>}/>
                  <Route path="/about" element={<About/>}/>
                  <Route path="*" element={<NotFound/>}/>
                </Route>
              </Routes>
            </AuthProvider>
    </div>
  )
}

export default App
