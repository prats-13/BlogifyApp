import React, { useState, useEffect } from 'react'
import './App.css'
import authService from "./appwrite/auth"
import {useDispatch} from 'react-redux'
import {login,logout} from './store/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {Outlet} from 'react-router-dom'

function App() {

  const [loading,setLoading] = useState(true)
  const dispatch=useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  }, [])

   return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header>
          <main>
           {/*  <Outlet /> */}
          </main>
        </Header>
        <Footer></Footer>
      </div>
    </div>
   ) : null
}

export default App
