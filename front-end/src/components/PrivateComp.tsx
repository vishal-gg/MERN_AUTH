import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../types/storeType";

const PrivateComp = () => {
  const {userInfo} = useAppSelector((state) => state.auth)
  return !userInfo ? <Outlet /> : <Navigate to="/" replace />
}

export default PrivateComp;
