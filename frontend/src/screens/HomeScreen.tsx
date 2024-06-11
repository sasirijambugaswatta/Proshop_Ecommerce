import {Col, Row} from "react-bootstrap";
import {Product} from "../Components/Product.tsx";
import {useGetProductsQuery} from "../slices/productApiSlice.ts";
import {LoaderScreen} from "./LoaderScreen.tsx";
import {Message} from "../Components/Message.tsx";


// import {useEffect, useState} from "react";
// import axios from "axios";

export type ProductType = {
    id: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
}

export const HomeScreen = () => {
    /*const [products, setProducts] = useState<ProductType[]>( []);

    useEffect(() => {
        const fetchProducts = async () => {
            const {data} = await axios.get('http://localhost:5000/api/products');
            console.log("Loaded products:", data);
            setProducts(data);
        };
        fetchProducts();
    }, []);*/


    const {data: products,isLoading,isError:error} = useGetProductsQuery();


    return (
        <>
            {isLoading ? (<LoaderScreen/>) : error ? (<Message variant={'danger'}>{error?.data?.message || error?.error}</Message>) : (<>
                <h1>Latest Product</h1>
                <Row>
                    {products.length > 0 && products.map((product,id) => (
                        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}/>
                        </Col>
                    ))}
                </Row>
            </>)}
        </>
    );
};/**/