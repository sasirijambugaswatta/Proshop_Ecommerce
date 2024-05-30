import {Alert} from "react-bootstrap";

// @ts-ignore
export const Message = ({variant: variant = 'info', children}) => {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    );
};
