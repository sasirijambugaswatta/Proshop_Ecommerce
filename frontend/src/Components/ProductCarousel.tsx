import {ProductType} from "../screens/HomeScreen.tsx";
import {LoaderScreen} from "../screens/LoaderScreen.tsx";
import {Message} from "./Message.tsx";
import {Carousel} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {useGetTopProductsQuery} from "../slices/productApiSlice.ts";
import'../assets/styles/index.css';

export const ProductCarousel = () => {
    const {data:products, isLoading, error} = useGetTopProductsQuery('');


    return (
        isLoading ? <LoaderScreen/> : error ? <Message variant={'danger'}>{error?.data?.message || error?.error}</Message> : (
            <Carousel pause={'hover'} className={'bg-primary mb-4'}>
                {products?.map((product: ProductType) => (
                    <Carousel.Item key={product!._id}>
                        <LinkContainer to={`/product/${product?._id}`}>
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
        )
    );
};