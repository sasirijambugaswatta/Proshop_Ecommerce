import {Spinner} from "react-bootstrap";


export const LoaderScreen = () => {
    return (
        <Spinner animation="border"
                 style={{width: '3rem', height: '3rem', margin:"auto", display: "block"}}>
        </Spinner>
    );
};