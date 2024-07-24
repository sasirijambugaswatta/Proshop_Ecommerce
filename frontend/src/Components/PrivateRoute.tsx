import {useSelector} from "react-redux";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {RootState} from "./Header.tsx";


export const PrivateRoute = () => {
    const location = useLocation();
    const {userInfo} = useSelector((state:RootState) => state.auth);

    if (!userInfo) {
        return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
    }

    return <Outlet />;
};