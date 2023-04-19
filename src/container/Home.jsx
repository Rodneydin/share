import React from 'react'
import Sidebar from '../components/Sidebar';
import { useState, useEffect } from 'react';

import{userQuery} from '../utils/data'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import { Link,Route,Routes } from 'react-router-dom';
import Pins from './Pins'
import { useRef } from 'react';
import { client } from '../client';
import logo from '../assets/logo.png'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from '../utils/firebase'
import Search from '../components/Search';
import UserProfile from '../components/UserProfile'





 const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false)
  //const [user, loading] = useAuthState(auth)
  const [user, setUser] = useState()
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  const scrollRef = useRef(null)
  const [pinData, setPinData] = useState()

  
  
  useEffect(() => {
    const query = userQuery(userInfo?.uid);

    client.fetch(query).then((data) => {
      setUser(data[0]);
      setPinData(data[0]);
    //  console.log(data) 
      
    });
  }, []);
 // console.log(userInfo)
 //console.log(pict)
 //console.log(picture)
 
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  
    
  }, []) 
  //console.log(user.image)
  //console.log(user)
  
  
  return (
    <>
      <div className='bg-gray-50 flex md:flex-row flex-col h-screen transition-height duration-75 ease-out' >
        <div className='hidden h-screen md:flex flex-initial'>
          <Sidebar user={user&& user}/>
          
        </div>
        <div className='flex md:hidden flex-row'>
            <div className='p-2 justify-between w-full flex flex-row items-center shadow-md'>
            <HiMenu fontSize={40} className="cursor-pointer" onClick={() =>setToggleSidebar(true)} />
            
            <Link to="/">
              <img src={logo} alt="logo" className='w-28 ' />
            </Link>
            <Link to={`user-profile/${user?._id}`}>
              <img src={userInfo?.photoURL} alt="logo" className='w-10 rounded-full ' />
            </Link>
            </div>
            {toggleSidebar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
            <div className='absolute w-full flex justify-end items-center p-2'>
                <AiFillCloseCircle fontSize={30} className='w-25 cursor-pointer' onClick={() => setToggleSidebar(false)} />
            </div>
            <Sidebar user={user&& user} closeToggle={setToggleSidebar} />
          </div>
        )}
         
        </div>
        
        <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
          <Routes>
            <Route path='/user-profile/:userId' element={<UserProfile user={user && user}/>} />
            <Route path='home' element={<Pins user={user && user}/>} />
             
          </Routes>
        </div>
        
    </div>
    </>
    
  )
}
export default Home;
