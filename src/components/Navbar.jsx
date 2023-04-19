import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdAdd, IoMdSearch} from 'react-icons/io'

const Navbar = ({ searchTerm, setSearchTerm}) => {
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  //const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()
  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
        <div className='flex justify-start  items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm '>
            <IoMdSearch fontSize={21} className='ml-1'/>
            <input 
             type="text"
             onChange={(e) => setSearchTerm(e.target.value)}
             placeholder='search'
             onFocus={() => navigate('/search')}
             className='p-2 w-full bg-white outline-none'
             />
             
        </div>
        <div className='flex gap-3'>
          <Link
           to={`user-profile/${userInfo?.uid}`}
           className='hidden md:block'
          >
            <img src={userInfo.photoURL} alt="user"  className='w-12 h-9 rounded-full'/>
          </Link>
          <Link
           to='create-pin'
           className='hidden md:block h-9 w-8 '
           >
            <IoMdAdd /> Create post
          </Link>
        </div>
    </div>
  )
}

export default Navbar