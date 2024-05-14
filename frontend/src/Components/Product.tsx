import {Card, CardBody, CardImg, CardText, CardTitle} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Rating} from "./Rating.tsx";


export const Product = ({product}) => {
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