import {
    Badge,
    Container,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarToggle,
    NavDropdown,
    NavLink
} from "react-bootstrap";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useLogoutMutation} from "../slices/usersApiSlice.ts";
import {logout} from "../slices/authSlice.ts";
import {SearchBox} from "./SearchBox.tsx";

export interface RootState {
    cart: {
        cartItems: CartItem[];
    };
    auth: {
        userInfo: UserInfo ;
    };
}

export interface CartItem {
    price?: number;
    qty?: number;
    shippingAddress?: ShippingAddress
}

type ShippingAddress = {
    address: string;
    city: string;
    postalCode: string;
    country: string;
};

export interface UserInfo {
    _id?: string;
    name: string;
    email:string
    isAdmin: boolean;
}

export const Header = () => {

    const {cartItems: cartItem} = useSelector((state:RootState) => state.cart);
    const {userInfo} = useSelector((state:RootState) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();


    async function logoutHandler() {
        try {
            await logoutApiCall('').unwrap();
            dispatch(logout());
            navigate('/login');
        }catch (err){
            console.log(err);
        }
    }

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
                           <SearchBox/>
                            <LinkContainer to={'/cart'}>
                                <NavLink ><FaShoppingCart/>Cart
                                    {
                                        cartItem.length > 0 && (
                                            <Badge pill bg={'success'} style={{marginLeft: '5px'}}>
                                                {cartItem.reduce((acc, item) => acc + item.qty!, 0)}
                                            </Badge>
                                        )
                                    }
                                </NavLink>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id={'username'}>
                                    <LinkContainer to={'/profile'}>
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                                ) : (
                                <LinkContainer to={'/login'}>
                                    <NavLink ><FaUser/>Sign In</NavLink>
                                </LinkContainer>
                            )};
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title={'Admin'} id={'adminmenu'}>
                                    <LinkContainer to={'/admin/userlist'}>
                                        <NavDropdown.Item>
                                            Users
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to={'/admin/productlist'}>
                                        <NavDropdown.Item>
                                            Products
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to={'/admin/orderlist'}>
                                        <NavDropdown.Item>
                                            Orders
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </Navbar>
        </header>
    );
};