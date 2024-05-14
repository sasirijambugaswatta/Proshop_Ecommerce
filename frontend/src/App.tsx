
import './App.css'
import {Header} from "./Components/Header.tsx";
import {Container} from "react-bootstrap";
import {Footer} from "./Components/Footer.tsx";
import {Outlet} from "react-router-dom";


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
    </>
  )
}

export default App
