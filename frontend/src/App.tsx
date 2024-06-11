
import './App.css'
import {Header} from "./Components/Header.tsx";
import {Container} from "react-bootstrap";
import {Footer} from "./Components/Footer.tsx";
import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
        <Header/>
        <main className={"py-3"}>
            <Container>
                <Outlet />
            </Container>
        </main>
        <Footer />
        <ToastContainer/>
    </>
  )
}

export default App
