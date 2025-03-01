import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, FormControl, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {Message} from "../Components/Message.tsx";
import {FaTrash} from "react-icons/fa";
import {addToCart, removeFromCart} from "../slices/cartSlice.ts";
import {RootState} from "../Components/Header.tsx";
import {FC} from "react";

export interface CartItem {
    _id: string;
    name: string;
    image: string;
    price: number;
    countInStock: number;
    qty: number;
}

export const CartScreen:FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state:RootState) => state.cart);
    const userInfo = useSelector((state:RootState) => state.auth);
    const {cartItems} = cart;

    const addToCartHandler = async (product:CartItem , qty:number) =>{
        dispatch(addToCart({...product,qty}));
    }

    async function removeFromCartHandler(id:string|undefined) {
        dispatch(removeFromCart(id));
    }

    function checkoutHandler() {
        if (userInfo) {
            navigate('/shipping');
        } else {
            navigate('/login?redirect=/shipping');
        }
    }

    return (

        <Row>
            <Col md={8}>
                <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {(cartItems as CartItem[]).map((item) => (
                            <ListGroupItem key={item._id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <FormControl
                                            as='select'
                                            value={item.qty}
                                            onChange={(e) =>
                                                addToCartHandler(item, Number(e.target.value))
                                            }
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </FormControl>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={()=> removeFromCartHandler(item._id)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty!, 0)})
                                items
                            </h2>
                            $
                            {cartItems
                                .reduce((acc, item) => acc + item.qty! * item.price!, 0)
                                .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={ checkoutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
};