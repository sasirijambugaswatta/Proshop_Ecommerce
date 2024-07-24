import {Link, useParams} from "react-router-dom";
import {
    useDeliverOrderMutation,
    useGetOrderDetailsQuery,
    useGetPaypalClientIdQuery,
    usePayOrderMutation
} from "../slices/ordersApiSlice.ts";
import {LoaderScreen} from "./LoaderScreen.tsx";
import {Message} from "../Components/Message.tsx";
import {Button, Card, Col, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {
    DISPATCH_ACTION,
    PayPalButtons,
    SCRIPT_LOADING_STATE,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {toast} from "react-toastify";
import { RootState} from "../Components/Header.tsx";
import {OnApproveData, OnApproveActions, CreateOrderData, CreateOrderActions} from "@paypal/paypal-js";


interface OrderItem {
    _id: string;
    name: string;
    qty: number;
    image: string;
    price: number;
    product: string;
}

export const OrderScreen = () => {
    const {id: orderId} = useParams();

    const {data: order , isError, isLoading, refetch } = useGetOrderDetailsQuery(orderId!);

    const [payOrder, {isLoading: isPayLoading}] = usePayOrderMutation();

    const [deliverOrder, {isLoading: isDeliverLoading}] = useDeliverOrderMutation();

    const [{isPending}, paypalDispatch] = usePayPalScriptReducer();

    const {data: paypal ,
        isLoading: isPaypalClientLoading,
        error: paypalClientError} = useGetPaypalClientIdQuery('');

    const {userInfo} = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if(!paypalClientError && !isPaypalClientLoading && paypal.clientId){
            const loadPaypalScript = async () => {
                paypalDispatch({
                    type: DISPATCH_ACTION.RESET_OPTIONS,
                    value: {
                        clientId: paypal.clientId,
                        currency: "USD",
                    }
                });
                paypalDispatch({type: DISPATCH_ACTION.LOADING_STATUS, value: SCRIPT_LOADING_STATE.PENDING});
            }
            if(order && !order.isPaid){
                if(!window.paypal){
                    loadPaypalScript();
                }
            }
        }
    }, [order, paypal, paypalDispatch, isPaypalClientLoading, paypalClientError]);


    function createOrder(_data:CreateOrderData, actions:CreateOrderActions) {
        return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: order.totalPrice.toString(),
                    }
                }
            ]
        }).then((orderId:string) => {
            return orderId;
        })
    }

    async function onApprove(_data: OnApproveData, actions:OnApproveActions) {
        return actions.order!.capture().then(async function (details) {
            try {
                await payOrder({orderId, details});
                refetch();
                toast.success('Payment successful');
            } catch (err) {
                if (err instanceof Error) {
                    toast.error(err.message);
                } else {
                    toast.error('An unknown error occurred');
                }
            }
        })
    }

    // function onError(err:Error) {
    //     toast.error(err.message);
    // }
    function onError(err: Record<string, unknown>) {
        if (err && typeof err === 'object' && 'message' in err && typeof err.message === 'string') {
            toast.error(err.message);
        } else {
            toast.error('An error occurred during the PayPal transaction.');
        }
    }

    async function deliverOrderHandler() {
        try {
            await deliverOrder(orderId!).unwrap();
            refetch();
            toast.success('Order delivered')
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error('An unknown error occurred');
            }
        }
    }

    return isLoading ? <LoaderScreen /> : isError ?
        <Message variant={'danger'} children={isError} /> : (
           <>
                <h1>Order</h1>
               <Row>
                  <Col md={8}>
                      <ListGroup variant={'flush'}>
                            <ListGroupItem>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name :</strong> {order.user.name}
                                </p>
                                <p>
                                    <strong>Email :</strong> {order.user.email}
                                </p>
                                <p>
                                    <strong>Address : </strong>
                                    {order.shippingAddress.address},
                                    {order.shippingAddress.city},
                                    {order.shippingAddress.postalCode},
                                    {order.shippingAddress.country}
                                </p>

                                {order.isDelivered ? (
                                    <Message variant={'success'}>
                                        Delivered on {order.deliveredAt}
                                    </Message>
                                ) : (
                                    <Message variant={'danger'}>Not Delivered</Message>
                                )}
                            </ListGroupItem>
                          <ListGroupItem>
                              <h2>Payment Method</h2>
                              <p>
                                  <strong>Payment Method : </strong>
                                  {order.paymentMethod}
                              </p>
                              {order.isPaid ? (
                                  <Message variant={'success'}>
                                      Paid on {order.paidAt}
                                  </Message>
                              ) : (
                                  <Message variant={'danger'}>Not Paid</Message>
                              )}
                          </ListGroupItem>

                          <ListGroupItem>
                              <h2>Order Items</h2>
                              {order.orderItems.map((item:OrderItem, index:number|string) => (
                                  <ListGroupItem key={index}>
                                      <Row>
                                          <Col md={2}>
                                              <Image src={item.image} alt={item.name} fluid rounded/>
                                          </Col>
                                          <Col>
                                              <Link to={`/product/${item.product}`}>
                                                  {item.name}
                                              </Link>
                                          </Col>
                                          <Col md={4} >
                                              {item.qty} x ${item.price} = ${item.qty * item.price}
                                          </Col>
                                      </Row>
                                  </ListGroupItem>
                              ))}
                          </ListGroupItem>
                      </ListGroup>
                  </Col>
                  <Col md={4}>
                      <Card>
                          <ListGroup variant={'flush'}>
                              <ListGroupItem>
                                  <h2>Order Summary</h2>
                              </ListGroupItem>
                              <ListGroupItem>
                                  <Row>
                                      <Col>Items</Col>
                                      <Col>${order.itemsPrice}</Col>
                                  </Row>
                              </ListGroupItem>
                              <ListGroupItem>
                                  <Row>
                                      <Col>Shipping</Col>
                                      <Col>${order.shippingPrice}</Col>
                                  </Row>

                                  <Row>
                                      <Col>Tax</Col>
                                      <Col>${order.taxPrice}</Col>
                                  </Row>

                                  <Row>
                                      <Col>Total</Col>
                                      <Col>${order.totalPrice}</Col>
                                  </Row>
                              </ListGroupItem>
                              {/* PayOrder Placeholder */
                                !order.isPaid && (
                                    <ListGroupItem>
                                        {isPayLoading && <LoaderScreen/>}

                                        {isPending ? (<LoaderScreen/>) : (
                                            <div>
                                                {/*<Button onClick={onApproveTest} style={{marginBottom: '10px'}}>Test Pay
                                                    Button</Button>*/}
                                                <div>
                                                    <PayPalButtons
                                                        createOrder={createOrder}
                                                        onApprove={onApprove}
                                                        onError={onError}></PayPalButtons>
                                                </div>
                                            </div>
                                        )}


                                    </ListGroupItem>
                                  )
                              }

                              {isDeliverLoading && <LoaderScreen/>}
                              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                  <ListGroupItem>
                                      <Button
                                          type="button"
                                          className="btn btn-block"
                                          onClick={deliverOrderHandler}
                                      >
                                          Mark As Delivered
                                      </Button>
                                  </ListGroupItem>
                              )}
                          </ListGroup>
                      </Card>
                  </Col>
               </Row>
           </>
    )
};