import {Col, Row} from "react-bootstrap";
import {Product, ProductType} from "../Components/Product.tsx";
import {useGetProductsQuery} from "../slices/productApiSlice.ts";
import {LoaderScreen} from "./LoaderScreen.tsx";
import {Message} from "../Components/Message.tsx";
import {Link, useParams} from "react-router-dom";
import {Paginate} from "../Components/Paginate.tsx";
import {ProductCarousel} from "../Components/ProductCarousel.tsx";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";

// import {useEffect, useState} from "react";
// import axios from "axios";

interface ProductsData {
    products: ProductType[];
    pages: number;
    page: number;
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

    const {pageNumber, keyword} = useParams();
    const {data,isLoading,isError,error} = useGetProductsQuery({pageNumber,keyword});

    if (isLoading) return <LoaderScreen />;

    if (isError) {
        let errorMessage = 'An error occurred';
        if (typeof error === 'object' && error !== null) {
            if ('status' in error) {
                // This is a FetchBaseQueryError
                const fetchError = error as FetchBaseQueryError;
                errorMessage = 'error' in fetchError ? fetchError.error : JSON.stringify(fetchError.data);
            } else {
                // This is a custom error
                errorMessage = (error as Error).message;
            }
        }
        return <Message variant="danger">{errorMessage}</Message>;
    }

    const productsData = data as ProductsData;

    return (
        <>
            {!keyword ? (
                <ProductCarousel />
            ) : (
                <Link to="/" className="btn btn-outline-dark mb-4">
                    Back
                </Link>
            )}

            <h1>Latest Products</h1>
            <Row>
                {productsData.products.map((product: ProductType) => (
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
            <Paginate
                pages={productsData.pages}
                page={productsData.page}
                isAdmin={false}
                keyword={keyword || ''}
            />
        </>
    );
};