import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
import {RootState} from "./Header.tsx";


export const PrivateRoute = () => {

    const {userInfo} = useSelector((state:RootState) => state.auth);

    return userInfo ? <Outlet/> : <Navigate to={'/login'} replace={true}/>
};