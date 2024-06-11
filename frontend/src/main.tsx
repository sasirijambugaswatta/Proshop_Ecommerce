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

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path={"/"} element={<App/>}>
            <Route index={true} path={"/"} element={<HomeScreen/>}/>
            <Route  path={'/product/:id'} element={<ProductScreen/>}/>
            <Route  path={'/cart'} element={<CartScreen/>}/>
            <Route path={'/login'} element={<LoginScreen/>}/>
            <Route path={'/register'} element={<RegisterScreen/>}/>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
