import {Nav, NavItem, NavLink} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import React from "react";

interface CheckoutStepsProps {
    step1?: boolean;
    step2?: boolean;
    step3?: boolean;
    step4?: boolean;
}

export const CheckoutSteps:React.FC<CheckoutStepsProps> = ({step1, step2, step3, step4}) => {
    return (
        <Nav className={'justify-content-center mb-4'}>
            <NavItem>
                {step1 ? (
                    <LinkContainer to={'/login'}>
                        <Nav.Link>Sign In</Nav.Link>
                    </LinkContainer>
                ) : (
                    <NavLink disabled>Sign In</NavLink>
                )}
            </NavItem>
            <NavItem>
                {step2 ? (
                    <LinkContainer to={'/shipping'}>
                        <Nav.Link>Shipping</Nav.Link>
                    </LinkContainer>
                ) : (
                    <NavLink disabled>Shipping</NavLink>
                )}
            </NavItem>
            <NavItem>
                {step3 ? (
                    <LinkContainer to={'/payment'}>
                        <Nav.Link>Payment</Nav.Link>
                    </LinkContainer>
                ) : (
                    <NavLink disabled>Payment</NavLink>
                )}
            </NavItem>
            <NavItem>
                {step4 ? (
                    <LinkContainer to={'/palceorder'}>
                        <Nav.Link>Place Order</Nav.Link>
                    </LinkContainer>
                ) : (
                    <NavLink disabled>Place Order</NavLink>
                )}
            </NavItem>
        </Nav>
    );
};