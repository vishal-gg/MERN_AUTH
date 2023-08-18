import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../types/storeType"

const ProtectedRoute = () => {
    const {userInfo} = useAppSelector(state => state.auth)
    return userInfo ? <Outlet /> : <Navigate to="/" replace />
}

export default ProtectedRoute


/////////////////   YOU CAN ALSO CREATE SINGLE COMPONENT FOR PROTECTED ROUTE ////////////////


// // ConditionalRoute.tsx

// import { Navigate, Outlet } from "react-router-dom";
// import { useAppSelector } from "../types/storeType";

// const ConditionalRoute = ({ isProtected }) => {
//   const {userInfo} = useAppSelector((state) => state.auth);

//   if (isProtected) {
//     return userInfo ? <Outlet /> : <Navigate to="/" replace />;
//   } else {
//     return !userInfo ? <Outlet /> : <Navigate to="/" replace />;
//   }
// };

// export default ConditionalRoute;





// // App.tsx

// <div>
// <Toaster />
// <Header />
// <Routes>
//       <Route index={true} element={<HomeScreen />} />
//       <Route path='' element={<ConditionalRoute isProtected={false} />}>
//       <Route path='/login' element={<LoginScreen />} />
//       <Route path='/register' element={<RegisterScreen />} />
//       </Route>
//       <Route path='' element={<ConditionalRoute isProtected={true} />}>
//         <Route path='/profile' element={<ProfileScreen />} />
//       </Route>
//       <Route path='/*' element={<h1>Not Found - {window.location.pathname}</h1>} />
// </Routes>
// </div>