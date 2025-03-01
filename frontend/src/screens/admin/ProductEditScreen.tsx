import {FormEvent, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useUpdateProductsMutation, useUploadProductImageMutation} from "../../slices/productApiSlice.ts";
import {useGetSingleProductQuery} from "../../slices/getSingleProductDetailsApiSlice.ts";
import {LoaderScreen} from "../LoaderScreen.tsx";
import {Message} from "../../Components/Message.tsx";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {FormContainer} from "../../Components/FormContainer.tsx";
import {toast} from "react-toastify";
import {getErrorMessage} from "../../utils/errUtil.ts";

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
    const [uploadProductImage] = useUploadProductImageMutation();
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

    async function submitHandler(e:FormEvent) {
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

        if (result.error instanceof Error) {
            toast.error(result.error.message);
        } else {
            toast.success('Product has been updated');
            navigate('/admin/productlist');
        }
    }

    async function uploadFileHandler(e:FormEvent) {
        const formData = new FormData();
        formData.append('image', (e.target as HTMLInputElement)!.files![0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success('Image uploaded');
            setImage(res.image);
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error('An unknown error occurred');
            }
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
                    <Message variant={'danger'}>{getErrorMessage(error)}</Message>) : (
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
                            <FormLabel htmlFor={'price'}>Price</FormLabel>
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
                            <FormLabel>Image</FormLabel>
                            <FormControl type={'text'} name={'image'} value={image}
                                         onChange={(e) => setImage(e.target.value)}/>
                            <FormControl type={'file'} id={'image'}
                                         accept={'.jpg,.png,.jpeg'}  onChange={uploadFileHandler}/>

                        </FormGroup>


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