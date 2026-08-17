import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
// import './App.css'

import {BrowserRouter,Routes,Route} from "react-router-dom"
import AuthSuccess from "./pages/AuthSuccess"
import Albums from './pages/Albums'
import AlbumDetails from './pages/AlbumDetails'
import AllPhotos from './pages/AllPhotos'
import Favorites from './pages/Favorites'

import Login from './pages/Login'
import Register from './pages/Register'

import ProtectedRoutes from './components/ProtectedRoutes'
import AuthenticatedLayout from './layouts/AuthenticatedLayout'

import { Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/auth/success' element={<AuthSuccess/>}/>
        <Route path='/albums' element={
            <ProtectedRoutes>
              <AuthenticatedLayout><Albums/></AuthenticatedLayout>
            </ProtectedRoutes>
          }
        />
        <Route path='/albums/:albumId' element={
            <ProtectedRoutes>
              <AuthenticatedLayout><AlbumDetails/></AuthenticatedLayout>
            </ProtectedRoutes>
          }
        />
        <Route path='/photos' element={
            <ProtectedRoutes>
              <AuthenticatedLayout><AllPhotos/></AuthenticatedLayout>
            </ProtectedRoutes>
          }
        />
        <Route path='/favorites' element={
            <ProtectedRoutes>
              <AuthenticatedLayout><Favorites/></AuthenticatedLayout>
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
