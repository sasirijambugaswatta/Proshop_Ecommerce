import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";


export const PrivateRoute = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const {userInfo} = useSelector((state) => state.auth);

    return userInfo ? <Outlet/> : <Navigate to={'/login'} replace={true}/>
};