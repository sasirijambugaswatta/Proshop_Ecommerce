import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useUpdateProductsMutation} from "../../slices/productApiSlice.ts";
import {useGetSingleProductQuery} from "../../slices/getSingleProductDetailsApiSlice.ts";
import {LoaderScreen} from "../LoaderScreen.tsx";
import {Message} from "../../Components/Message.tsx";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {FormContainer} from "../../Components/FormContainer.tsx";
import {toast} from "react-toastify";

export const ProductEditScreen = () => {
    const {id: productId} = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');

    const {data: product, isLoading, refetch, error} = useGetSingleProductQuery(productId!);

    const [updateProduct, {isLoading: isLoadingUpdate}] = useUpdateProductsMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    async function submitHandler(e:Event) {
        e.preventDefault();
        const updatedProduct = {
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        };
        const result = await updateProduct(updatedProduct);

        if (result.error) {
            toast.error(result.error);
        }else {
            toast.success('Product has been updated');
            navigate('/admin/productlist');
        }
    }

    return (
        <>
            <Link to={'/admin/productlist'} className={'btn btn-light'}>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {isLoadingUpdate && (<LoaderScreen/>)}

                {isLoading ? (<LoaderScreen/>) : error ? (
                    <Message variant={'danger'}>{error?.data?.message || error?.error}</Message>) : (
                    <Form onSubmit={submitHandler}>
                        <FormGroup className={'my-2'}>
                                <FormLabel htmlFor={'name'}>Name</FormLabel>
                                <FormControl
                                    type={'text'}
                                    name={'name'}
                                    id={'name'}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                        </FormGroup>
                        <FormGroup className={'my-2'}>
                            <FormLabel htmlFor={'price'}>Name</FormLabel>
                            <FormControl
                                type={'number'}
                                name={'price'}
                                id={'price'}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </FormGroup>

                        {/*Image Input placeHolder*/}

                        <FormGroup className={'my-2'}>
                            <FormLabel htmlFor={'brand'}>Brand</FormLabel>
                            <FormControl
                                type={'text'}
                                name={'brand'}
                                id={'brand'}
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup className={'my-2'}>
                            <FormLabel htmlFor={'countInStock'}>Count In Stock</FormLabel>
                            <FormControl
                                type={'number'}
                                name={'countInStock'}
                                id={'countInStock'}
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup className={'my-2'}>
                            <FormLabel htmlFor={'category'}>Category</FormLabel>
                            <FormControl
                                type={'text'}
                                name={'category'}
                                id={'category'}
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </FormGroup>

                        <FormGroup className={'my-2'}>
                            <FormLabel htmlFor={'description'}>Description</FormLabel>
                            <FormControl
                                type={'text'}
                                name={'description'}
                                id={'description'}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormGroup>
                        <Button type={'submit'} variant={'primary'} className={'my-2'}>Update</Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
};