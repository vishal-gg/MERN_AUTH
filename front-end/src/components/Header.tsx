import { Outlet, NavLink, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../types/storeType";
import { deleteAccount, logout } from "../store/features/asynOperation/authSlice";
import {useState} from 'react'

const Header = () => {
  const {userInfo} = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleAccountDeletion = () => {
    const confirmation = confirm('Are you sure you want to delete your account?')
    if(confirmation && userInfo !== null) {
      dispatch(deleteAccount(userInfo._id))
      .then(()=>console.log('Account deleted successfully'))
    }
  }

  return (
    <div className="flex justify-between">
      <h1>Header component</h1>
      { !userInfo ? (
        <div className="ml-5">
        <NavLink
          className={({isActive}) => (isActive ? "bg-red-400 p-2" : "p-2")}
          to="/login"
          end
        >
          login
        </NavLink>
        <NavLink
          className={({isActive}) => (isActive ? "bg-red-400 p-2" : "p-2")}
          to="/register"
          end
        >
          register
        </NavLink>
        </div>
      ):<button  onMouseLeave={()=>setToggleMenu(false)} onClick={()=>setToggleMenu(prev => !prev)} className="cursor-pointer p-3 relative bg-sky-100 selection:bg-none active:bg-sky-300"> <h2 >{userInfo?.name} {toggleMenu ?  '🔼' : '🔽'}</h2>
      {toggleMenu && (
        <div className="flex flex-col bg-zinc-300 absolute transform translate-y-full bottom-0 left-0 right-0">
        <Link className="hover:bg-blue-400 p-[0px_8px]" to='/profile'>profile</Link>        
        <Link className="hover:bg-blue-400 p-[0px_8px]" to='#' onClick={()=> dispatch(logout())}>logout</Link>
        <Link className="hover:bg-blue-400 p-[0px_8px]" to='#' onClick={handleAccountDeletion}>delete ac</Link>
        </div>
      )}
      </button>
      }
      {/* <Toaster /> */}
      <Outlet />
    </div>
  )
}

export default Header;
