import {useCreateProductMutation, useGetProductsQuery} from "../../slices/productApiSlice.ts";
import {Button, Col, Row} from "react-bootstrap";
import {Message} from "../../Components/Message.tsx";
import {LoaderScreen} from "../LoaderScreen.tsx";
import {LinkContainer} from "react-router-bootstrap";
import {FaEdit, FaTrash} from "react-icons/fa";
import {toast} from "react-toastify";

export const ProductListScreen = () => {
    const {data: products, isLoading, error, refetch} = useGetProductsQuery('');//{data} useGetProductsQuery()
    const [createProduct, {isLoading: isLoadingCreate}] = useCreateProductMutation();
    function deleteHandler(productId: string) {
        console.log('delete')
    }

    async function createProductHandler() {
        if(window.confirm('Are you sure want to create a new product? ')){
            try {
                 await createProduct({});
                 refetch();
            }catch (err ){
                toast.error(err?.data?.message || err?.error)
            }
        }
    }

    return (
        <>
            <Row>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className={'text-end'}>
                    <Button className={'btn btn-primary'} onClick={createProductHandler}>Create Product</Button>
                </Col>
            </Row>

            {isLoadingCreate && <LoaderScreen/>}

            {isLoading ? (<LoaderScreen/>) : error ? (
                <Message variant={'danger'}>{error?.data?.message || error?.error}</Message>) : (
                <table className={'table table-striped table-bordered'}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {products?.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                    <Button variant={'light'} className={'btn-sm mx-2'}><FaEdit/></Button>
                                </LinkContainer>
                                <LinkContainer to={`/admin/products/${product._id}/delete`}>
                                    <Button variant={'danger'} className={'btn-sm mx-2'} onClick={() => deleteHandler(product._id)}><FaTrash color={'white'}/></Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
};