import {LoaderScreen} from "../screens/LoaderScreen.tsx";
import {Message} from "./Message.tsx";
import {Carousel} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useGetTopProductsQuery} from "../slices/productApiSlice.ts";
import'../assets/styles/index.css';
import {ProductType} from "./Product.tsx";

export const ProductCarousel = () => {
    const {data:products, isLoading, error} = useGetTopProductsQuery('');

    const getErrorMessage = (error: unknown): string => {
        if (typeof error === 'object' && error !== null) {
            if ('data' in error && typeof error.data === 'object' && error.data !== null) {
                if ('message' in error.data && typeof error.data.message === 'string') {
                    return error.data.message;
                }
            }
            if ('error' in error && typeof error.error === 'string') {
                return error.error;
            }
        }
        return 'An unknown error occurred';
    };

    if (isLoading) {
        return <LoaderScreen />;
    }

    if (error) {
        return <Message variant='danger'>{getErrorMessage(error)}</Message>;
    }

    return (
        <div className="product-carousel-container">
                <Carousel pause={'hover'} className={'bg-primary mb-4'} interval={1500}>
                    {products?.map((product:ProductType) => (
                        <Carousel.Item key={product._id}>
                            <LinkContainer to={`/product/${product._id}`}>
                                <img
                                    className="d-block w-100"
                                    src={product.image}
                                    alt={product.name}
                                />
                            </LinkContainer>
                            <Carousel.Caption className={'carousel-caption'}>
                                <h2>
                                    {product.name} (${product.price})
                                </h2>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
        </div>
    );
};