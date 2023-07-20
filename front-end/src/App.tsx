import './style/globals.css'
import {Route, Routes} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import Header from './components/Header'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import PrivateComp from './components/PrivateComp'
import ProfileScreen from './screens/ProfileScreen'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
      <Header />
      <Routes>
            <Route index={true} element={<HomeScreen />} />
            <Route path='' element={<PrivateComp />}>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            </Route>
            <Route path='' element={<ProtectedRoute />}>
              <Route path='/profile' element={<ProfileScreen />} />
            </Route>
            <Route path='/*' element={<h1>Not Found - {window.location.pathname}</h1>} />
      </Routes>
    </>

  )
}

export default App



