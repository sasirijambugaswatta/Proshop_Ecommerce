import {Col, Row} from "react-bootstrap";
import product from "../products.ts";
import {Product} from "../Components/Product.tsx";

export const HomeScreen = () => {
    return (
        <>
            <h1>Latest Product</h1>
            <Row>
                {product.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
        </>
    );
};