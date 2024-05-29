import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Entry from './pages/Entry'
import Home from './pages/Home'
import About from './pages/About'
import Logout from './pages/Logout'
import Menu from './pages/Menu'
import CreateWork from './pages/CreateWork'
import Product from './pages/Product'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Team from './pages/Team'
import Cart from './pages/Cart'
import Edit from './components/Edit'
import Product1 from './pages/Product1'
import Error from './components/Error'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home ></Home>}></Route>
          <Route path='/home' element={<Home></Home>}></Route>
          <Route path='/entry' element={<Entry></Entry>}></Route>
          <Route path='/edit/:id' element={<Edit></Edit>}></Route>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='/menu/:id' element={<Menu></Menu>}></Route>
          <Route path='/allproducts' element={<Product1 navbar={<Navbar></Navbar>} title={"All Products"} ></Product1>}></Route>
          <Route path='/creatework' element={<CreateWork></CreateWork>}></Route>
          <Route path='/contact' element={<Contact></Contact>}></Route>
          <Route path='/team' element={<Team></Team>}></Route>
          <Route path='/cart' element={<Cart></Cart>}></Route>
          <Route path='/logout' element={<Logout></Logout>}></Route>
          <Route path='*' element={<Error></Error>}></Route>
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
