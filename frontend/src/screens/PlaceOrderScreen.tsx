import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {CheckoutSteps} from "../Components/CheckoutSteps.tsx";
import {Button, Card, Col, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {Message} from "../Components/Message.tsx";
import {useCreateOrderMutation} from "../slices/ordersApiSlice.ts";
import {LoaderScreen} from "./LoaderScreen.tsx";
import {clearCartItems} from "../slices/cartSlice.ts";
import {toast} from "react-toastify";

export const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    const [createOrder, {isLoading, isError}] = useCreateOrderMutation();

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (err) {
            toast.error(err);
        }
    }

    useEffect(() => {
        if(!cart.paymentMethod) {
            navigate('/payment')
        }else if(!cart.shippingAddress) {
            navigate('/shipping')
        }
    }, [cart.paymentMethod, cart.shippingAddress, cart.shippingAddress.address, navigate]);

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />

            <Row>
                <Col md={8} >
                    <ListGroup variant={'flush'}>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address},{' '}
                                {cart.shippingAddress.city},{' '}
                                {cart.shippingAddress.postalCode},{' '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty</Message>
                            ) : (
                                <ListGroup variant={'flush'}>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        className={'img-fluid rounded'}
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item._id}`}>
                                                        <strong>{item.name}</strong>
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>
                    </ListGroup>
                </Col>

                <Col md={4} >
                    <Card>
                        <ListGroup variant={'flush'}>
                            <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>$ {cart.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>$ {cart.shippngPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>$ {cart.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col><strong>Total</strong></Col>
                                    <Col>$ {cart.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                {isError && <Message variant={'danger'}>{isError}</Message>}
                            </ListGroupItem>

                            <ListGroupItem>
                                <Button type={"button"}
                                        className={'btn-block'}
                                        disabled={cart.cartItems.length === 0}
                                onClick={placeOrderHandler}>Place Order
                                </Button>
                                {isLoading && <LoaderScreen />}
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>


            </Row>
        </>

    );
}