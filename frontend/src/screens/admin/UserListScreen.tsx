import {LoaderScreen} from "../LoaderScreen.tsx";
import {Message} from "../../Components/Message.tsx";
import {Button, Table} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {FaCheck, FaEdit, FaTimes, FaTrash} from "react-icons/fa";
import {useDeleteUserMutation, useGetUsersQuery} from "../../slices/usersApiSlice.ts";
import {toast} from "react-toastify";

export const UserListScreen = () => {

    const {data: users, isLoading, error, refetch} = useGetUsersQuery('');
    const[deleteUser, {isLoading: isLoadingDelete}] = useDeleteUserMutation();

    const deleteHandler = async (id: string) => {
        if(window.confirm('Are you sure?')) {
            try {
                await deleteUser(id);
                toast.success('User deleted');
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err?.error)
            }
        }
    }

    return (
        <>
            <h1>Users</h1>
            {isLoadingDelete && <LoaderScreen/>}
            {isLoading ? (<LoaderScreen/>) : error ? (<Message variant={'danger'}>{error?.data?.message || error?.error}</Message>) : (
                <Table striped={true} bordered={true} hover={true} responsive={true} className={'table-sm'}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {users?.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>{user.isAdmin ? (<FaCheck color={'green'}/>): (<FaTimes color={'red'}/>)}</td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button className={'btn-sm'}><FaEdit/></Button>
                                </LinkContainer>
                                <Button className={'btn-sm'} variant={'danger'} onClick={() => deleteHandler(user._id)}><FaTrash/></Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};