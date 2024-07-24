import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Card, Col, Form, FormControl, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {Rating} from "../Components/Rating.tsx";
// import {useEffect, useState} from "react";
// import {ProductType} from "./HomeScreen.tsx";
// import axios from "axios";
import {LoaderScreen} from "./LoaderScreen.tsx";
import {useGetSingleProductQuery} from "../slices/getSingleProductDetailsApiSlice.ts";
import {FormEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../slices/cartSlice.ts";
import {useCreateReviewMutation} from "../slices/productApiSlice.ts";
import {Message} from "../Components/Message.tsx";
import {toast} from "react-toastify";
import {Meta} from "../Components/Meta.tsx";
import {RootState} from "../Components/Header.tsx";

interface Review {
    _id: string;
    name: string;
    rating: number;
    createdAt: string;
    comment: string;
}


export const ProductScreen = () => {

    // const [product, setProduct] = useState<ProductType>();

    const {id: productId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');



/*    useEffect(() => {
        const fetchProducts = async () => {
            const {data} = await axios.get(`http://localhost:5000/api/products/${productId}`);
            setProduct(data);
        };
        fetchProducts();
        console.log(product);
    }, [product, productId]);*/

     const{data:product,isLoading,isError,refetch} = useGetSingleProductQuery(productId);

     const [createReview, {isLoading: isReviewLoading}] = useCreateReviewMutation();

     const {userInfo} = useSelector((state:RootState) => state.auth);

    function addToCartHandler() {
        dispatch(addToCart({...product, qty}));
        navigate('/cart');
    }


    async function submitHandler(e:FormEvent) {
        e.preventDefault();
        try{
            console.log({productId, rating, comment});
            const addedReview = await createReview({productId, rating, comment});
            refetch();
            if(addedReview.error){
                toast.error('review could not be created');
            }else {
                toast.success('Review has been created');
                setRating(0);
                setComment('');
            }
        }catch (err){
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error('An unknown error occurred');
            }
        }
    }

    return (
        <>
            {product && !isLoading && !isError ?
                <>
                    <Link className={'btn btn-light my-3'} to={'/'}>Go Back</Link>
                    <Meta title={product.name} description={product.description} keywords={product.keyword}/>
                    <Row>

                        <Col md={5}>
                            <Image src={product!.image} alt={product!.name} fluid={true}/>
                            {/*{product.image}*/}
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
                                    {product.countInStock > 0 && (
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <FormControl as={'select'}
                                                                 value={qty}
                                                                 onChange={(e) => setQty(Number(e.target.value))}>
                                                        {[...Array(product!.countInStock).keys()].map((x) => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </FormControl>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    )}
                                    <ListGroupItem>
                                        <Button
                                            className={"btn btn-block"}
                                            type={'button'}
                                            disabled={product!.countInStock === 0}
                                        onClick={addToCartHandler}>
                                            Add to Cart
                                        </Button>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>

                    </Row>
                    <Row className={'review'}>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant={'flush'}>
                                {product.reviews.map((review:Review) => (
                                    <ListGroupItem key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} text={''}/>
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroupItem>
                                ))}

                                <ListGroupItem>
                                    <h2>Write a Customer Review</h2>
                                    {isReviewLoading && <LoaderScreen/>}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId="rating" className={'my-2'}>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={rating}
                                                    onChange={(e) => setRating(Number(e.target.value))}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="1">1 - Poor</option>
                                                    <option value="2">2 - Fair</option>
                                                    <option value="3">3 - Good</option>
                                                    <option value="4">4 - Very Good</option>
                                                    <option value="5">5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="comment">
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button
                                                disabled={isReviewLoading}
                                                type="submit"
                                                variant="primary"
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please <Link to="/login">sign in</Link> to write a review{' '}
                                        </Message>
                                    )}
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
                : <LoaderScreen/>}

        </>

    );
};