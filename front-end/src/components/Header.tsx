import { Outlet, NavLink, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../types/storeType";
import { deleteAccount, logout } from "../store/features/asynOperation/authSlice";
import {useState} from 'react'
import { Toaster, toast } from "react-hot-toast";

const Header = () => {
  const {userInfo} = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleAccountDeletion = () => {
    const confirmation = confirm('Are you sure you want to delete your account?')
    if(confirmation && userInfo !== null) {
      dispatch(deleteAccount(userInfo._id))
      .then(()=>toast.success('Account deleted successfully'))
    }
  }
  const handleLogout = () => {
    dispatch(logout())
    .then(() => toast.success('Logged out'))
    .catch(() => toast.error('Failed!'))
  }

  return (
    <div className="flex justify-between items-center bg-gray-800 h-16 px-5 fixed w-full">
      <h1 className="text-white">Navbar</h1>
      { !userInfo ? (
        <div className="bg-gray-700 p-5 flex gap-3 text-white text-semibold">
        <NavLink
          className={({isActive}) => (!isActive ? "text-gray-400" : '')}
          to="/login"
          end
        >
          Login
        </NavLink>
        <NavLink
          className={({isActive}) => (!isActive ? "text-gray-400" : '')}
          to="/register"
          end
        >
          Register
        </NavLink>
        </div>
      ):<button  onMouseLeave={()=>setToggleMenu(false)} onClick={()=>setToggleMenu(prev => !prev)} className="cursor-pointer p-5 relative bg-sky-100 selection:bg-none active:bg-sky-300"> <h2 >{userInfo?.name} {toggleMenu ?  '🔼' : '🔽'}</h2>
      {toggleMenu && (
        <div className="flex flex-col bg-zinc-300 absolute transform translate-y-full bottom-0 left-0 right-0">
        <Link className="hover:bg-blue-400 p-[0px_8px]" to='/profile'>profile</Link>        
        <Link className="hover:bg-blue-400 p-[0px_8px]" to='#' onClick={handleLogout}>logout</Link>
        <Link className="hover:bg-blue-400 p-[0px_8px]" to='#' onClick={handleAccountDeletion}>delete ac</Link>
        </div>
      )}
      </button>
      }
      <Toaster />
      <Outlet />
    </div>
  )
}

export default Header;
