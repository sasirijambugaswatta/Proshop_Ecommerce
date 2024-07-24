import {useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery} from "../../slices/productApiSlice.ts";
import {Button, Col, Row} from "react-bootstrap";
import {Message} from "../../Components/Message.tsx";
import {LoaderScreen} from "../LoaderScreen.tsx";
import {LinkContainer} from "react-router-bootstrap";
import {FaEdit, FaTrash} from "react-icons/fa";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {Paginate} from "../../Components/Paginate.tsx";
import {ProductType} from "../../Components/Product.tsx";
import {getErrorMessage} from "../../utils/errUtil.ts";


export const ProductListScreen = () => {
    const {pageNumber} = useParams();

    const {data, isLoading, error, refetch} = useGetProductsQuery({pageNumber});
    const [createProduct, {isLoading: isLoadingCreate}] = useCreateProductMutation();
    const [deleteProduct, {isLoading: isLoadingDelete}] = useDeleteProductMutation();
    async function deleteHandler(productId: string) {
        if(window.confirm('Are you sure?')){
            try {
                await deleteProduct(productId);
                toast.success('Product deleted');
                refetch();
            }catch (err ){
                if (err instanceof Error) {
                    toast.error(err.message);
                } else {
                    toast.error('An unknown error occurred');
                }
            }
        }
    }

    async function createProductHandler() {
        if(window.confirm('Are you sure want to create a new product? ')){
            try {
                 await createProduct({});
                 refetch();
            }catch (err ){
                if (err instanceof Error) {
                    toast.error(err.message);
                } else {
                    toast.error('An unknown error occurred');
                }
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
            {isLoadingDelete && <LoaderScreen/>}

            {isLoading ? (<LoaderScreen/>) : error ? (
                <Message variant={'danger'}>{getErrorMessage(error)}</Message>) : (
                <>
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
                        {data.products?.map((product:ProductType) => (
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
                                    <LinkContainer to={`/admin/productlist`}>
                                        <Button variant={'danger'} className={'btn-sm mx-2'}
                                                onClick={() => deleteHandler(product._id)}><FaTrash
                                            color={'white'}/></Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Paginate pages={data.pages} page={data.page} isAdmin={true}/></>
            )}
        </>
    );
};