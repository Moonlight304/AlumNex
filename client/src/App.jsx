import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";


import { Home } from './components/Home'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { Feed } from './components/Feed'
import { ShowPost } from './components/ShowPost';
import { NewPost } from './components/NewPost'
import { Events } from './components/Events'
import { NewEvent } from './components/NewEvent'
import { Test } from './components/test';
import { Community } from './components/Community';
import { User } from './components/User';
import { SearchFilters } from './components/SearchFilters';
import { WOF } from './components/WOF'

function App() {

    return (
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />

                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />

                    <Route path='/feed' element={<Feed />} />
                    <Route path='/feed/:postID' element={<ShowPost />} />
                    <Route path='/feed/new_post' element={<NewPost />} />

                    <Route path='/events' element={<Events />} />
                    <Route path='/events/new_event' element={<NewEvent />} />

                    <Route path='/community' element={<Community />} />

                    <Route path='/user/:userID' element={<User />} />

                    <Route path='/directory' element={<SearchFilters />} />
                    <Route path='/wall_of_fame' element={<WOF />} />
                    

                    <Route path='/test' element={<Test />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
