import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";


import { Home } from './components/Home'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { Feed } from './components/Feed'
import { NewPost } from './components/NewPost';

function App() {

    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/feed' element={<Feed />} />
                    <Route path='/feed/new_post' element={<NewPost />} />


                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
