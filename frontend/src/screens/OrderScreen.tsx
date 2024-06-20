import {Link, useParams} from "react-router-dom";
import {useGetOrderDetailsQuery} from "../slices/ordersApiSlice.ts";
import {LoaderScreen} from "./LoaderScreen.tsx";
import {Message} from "../Components/Message.tsx";
import {Card, Col, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";

export const OrderScreen = () => {
    const {id: orderId} = useParams();

    const {data: order , isError, isLoading, refetch } = useGetOrderDetailsQuery(orderId!);
    console.log('fetched order',order)

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
                              {order.orderItems.map((item, index) => (
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
                              {/* PayOrder Placeholder */}
                              {/* Mark as delivered Placeholder */}
                          </ListGroup>
                      </Card>
                  </Col>
               </Row>
           </>
    )
};