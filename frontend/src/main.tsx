 import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom'
import {Provider} from "react-redux";
import {store} from "../store.ts";
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import {HomeScreen} from "./screens/HomeScreen.tsx";
import {ProductScreen} from "./screens/ProductScreen.tsx";
import {CartScreen} from "./screens/CartScreen.tsx";
 import {LoginScreen} from "./screens/LoginScreen.tsx";
 import {RegisterScreen} from "./screens/RegisterScreen.tsx";
 import {ShippingScreen} from "./screens/ShippingScreen.tsx";
 import {PrivateRoute} from "./Components/PrivateRoute.tsx";
 import {PaymentScreen} from "./screens/PaymentScreen.tsx";
 import {PlaceOrderScreen} from "./screens/PlaceOrderScreen.tsx";
 import {OrderScreen} from "./screens/OrderScreen.tsx";
 import {PayPalScriptProvider} from "@paypal/react-paypal-js";
 import {ProfileScreen} from "./screens/ProfileScreen.tsx";
 import {AdminRoute} from "./Components/AdminRoute.tsx";
 import {OrderListScreen} from "./screens/admin/OrderListScreen.tsx";
 import {ProductListScreen} from "./screens/admin/ProductListScreen.tsx";
 import {ProductEditScreen} from "./screens/admin/ProductEditScreen.tsx";
 import {UserListScreen} from "./screens/admin/UserListScreen.tsx";
 import {UserEditScreen} from "./screens/admin/UserEditScreen.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={"/"} element={<App/>}>
            <Route index={true} path={"/"} element={<HomeScreen/>}/>
            <Route  path={'/product/:id'} element={<ProductScreen/>}/>
            <Route  path={'/cart'} element={<CartScreen/>}/>
            <Route path={'/login'} element={<LoginScreen/>}/>
            <Route path={'/register'} element={<RegisterScreen/>}/>

            <Route path={''} element={<PrivateRoute/>}>
                <Route path={'/shipping'} element={<ShippingScreen/>}/>
                <Route path={'/payment'} element={<PaymentScreen/>}/>
                <Route path={'/placeorder'} element={<PlaceOrderScreen/>}/>
                <Route path={'/order/:id'} element={<OrderScreen/>}/>
                <Route path={'/profile'} element={<ProfileScreen/>}/>
            </Route>

            <Route path={''} element={<AdminRoute/>}>
                <Route path={'/admin/orderlist'} element={<OrderListScreen/>}/>
                <Route path={'/admin/productlist'} element={<ProductListScreen/>}/>
                <Route path={'/admin/products/:id/edit'} element={<ProductEditScreen/>}/>
                <Route path={'/admin/userlist'} element={<UserListScreen/>}/>
                <Route path={'/admin/user/:id/edit'} element={<UserEditScreen/>}/>
            </Route>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <PayPalScriptProvider deferLoading={true} options={{clientId: "test"}}>
                <RouterProvider router={router}/>
            </PayPalScriptProvider>
        </Provider>
    </React.StrictMode>,
)
