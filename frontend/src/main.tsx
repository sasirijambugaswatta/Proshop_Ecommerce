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
