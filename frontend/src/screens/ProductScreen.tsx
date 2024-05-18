import {Link, useParams} from "react-router-dom";
import {Button, Card, Col, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {Rating} from "../Components/Rating.tsx";
import {useEffect, useState} from "react";
import {ProductType} from "./HomeScreen.tsx";
import axios from "axios";
import {Loader} from "../Components/Loader.tsx";


export const ProductScreen = () => {

    const [product, setProduct] = useState<ProductType>();

    const {id: productId} = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            const {data} = await axios.get(`http://localhost:5000/api/products/${productId}`);
            setProduct(data);
        };
        fetchProducts();
        console.log(product);
    }, [product, productId]);


    return (
        <>
            {product ?
                <>
                    <Link className={'btn btn-light my-3'} to={'/'}>Go Back</Link>

                    <Row>

                        <Col md={5}>
                            <Image src={product!.image} alt={product!.name} fluid={true}/>
                        </Col>

                        <Col md={4}>
                            <ListGroup variant={"flush"}>
                                <ListGroupItem>
                                    <h3>{product!.name}</h3>
                                </ListGroupItem>

                                <ListGroupItem>
                                    <Rating value={product!.rating} text={`${product!.numReviews} reviews`} />
                                </ListGroupItem>

                                <ListGroupItem>
                                    Price : ${product!.price}
                                </ListGroupItem>
                                <ListGroupItem>
                                    {product!.description}
                                </ListGroupItem>
                            </ListGroup>

                        </Col>

                        <Col md={3}>
                            <Card>
                                <ListGroup variant={"flush"}>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>
                                                Price:
                                            </Col>

                                            <Col>
                                                <strong>${product!.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>
                                                Status:
                                            </Col>

                                            <Col>
                                                <strong>{product!.countInStock > 0 ? 'In Stock': 'Out of Stock'}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Button className={"btn btn-block"} type={'button'} disabled={product!.countInStock === 0}>
                                            Add to Cart
                                        </Button>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>

                    </Row>
                </>
                : <Loader/>}

        </>

    );
};