import {Badge, Container, Nav, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, NavLink} from "react-bootstrap";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import {LinkContainer} from "react-router-bootstrap";
import {useSelector} from "react-redux";

export const Header = () => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const {cartItems: cartItem} = useSelector((state) => state.cart);


    return (
        <header>
            <Navbar bg="dark" variant="dark" collapseOnSelect={true} expand="md">
                <Container>
                    <LinkContainer to={'/'}>
                        <NavbarBrand>
                            <img className={"w-25 h-25"} src="/src/assets/logo.png" alt="ProShop Logo"/>
                            ProShop</NavbarBrand>
                    </LinkContainer>
                    <NavbarToggle aria-controls={"basic-navbar-nav"}/>
                    <NavbarCollapse id={"basic-navbar-nav"}>
                        <Nav className="ms-auto">
                            <LinkContainer to={'/cart'}>
                                <NavLink href="/cart"><FaShoppingCart/>Cart
                                    {
                                        cartItem.length > 0 && (
                                            <Badge pill bg={'success'} style={{marginLeft: '5px'}}>
                                                {cartItem.reduce((acc, item) => acc + item.qty, 0)}
                                            </Badge>
                                        )
                                    }
                                </NavLink>
                            </LinkContainer>
                            <LinkContainer to={'/login'}>
                                <NavLink href="/login"><FaUser/>Sign In</NavLink>
                            </LinkContainer>
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </Navbar>
        </header>
    );
};