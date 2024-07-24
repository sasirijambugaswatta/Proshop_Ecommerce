import {Card, CardBody, CardImg, CardText, CardTitle} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Rating} from "./Rating.tsx";
import {FC} from "react";

export interface ProductType {
    brand: string;
    category: string;
    _id: string;
    id?:string;
    name: string;
    image: string;
    price: number;
    rating: number;
    numReviews: number;
}

// Define the props for the Product component
export interface ProductProps {
    product: ProductType;
}


export const Product: FC<ProductProps> = ({product}) => {
    return (
        <Card className={"my-3 p-3 rounded"}>
            <a href={`/product/${product._id}`}>
                <CardImg src={product.image} variant={"top"}/>
            </a>
            
            <CardBody>
                <Link to={`/product/${product._id}`} >
                    <CardTitle as={"div"} className={'product-title'}>
                        <strong>{product.name}</strong>
                    </CardTitle>
                </Link>

                <CardText as={'div'} >
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </CardText>

                <CardText as={"h3"}>
                    ${product.price}
                </CardText>
            </CardBody>
        </Card>
    );
};