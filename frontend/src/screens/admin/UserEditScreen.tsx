import {FormEvent, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {LoaderScreen} from "../LoaderScreen.tsx";
import {Message} from "../../Components/Message.tsx";
import {Button, Form, FormCheck, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {FormContainer} from "../../Components/FormContainer.tsx";
import {toast} from "react-toastify";
import {useGetUserDetailsQuery, useUpdateUserMutation} from "../../slices/usersApiSlice.ts";
import {getErrorMessage} from "../../utils/errUtil.ts";


export const UserEditScreen = () => {
    const {id: userId} = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const {data: user, isLoading: isLoadingUser, refetch, isError,error} = useGetUserDetailsQuery(userId);

    const [updateUser, {isLoading: isLoadingUpdate}] = useUpdateUserMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }

    }, [user]);


    async function submitHandler(e:FormEvent) {
        e.preventDefault();
        try{
            const updatedUser = {
                _id: userId,
                name,
                email,
                isAdmin
            };
            await updateUser(updatedUser);
            toast.success('User has been updated');
            refetch();
            navigate('/admin/userlist');
        }catch (err){
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error('An unknown error occurred');
            }
        }
    }




return (
    <>
        <Link to={'/admin/userlist'} className={'btn btn-light'}>
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit User</h1>
            {isLoadingUpdate && (<LoaderScreen/>)}

            {isLoadingUser ? (<LoaderScreen/>) : isError ? (
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
                        <FormLabel htmlFor={'email'}>Email</FormLabel>
                        <FormControl
                            type={'email'}
                            name={'email'}
                            id={'email'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormCheck
                            type={'checkbox'}
                            label={'isAdmin'}
                            id={'isAdmin'}
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin((e.target as HTMLInputElement).checked)}
                        />
                    </FormGroup>

                    <Button type={'submit'} variant={'primary'} className={'my-2'}>Update</Button>
                </Form>
            )}
        </FormContainer>
    </>
)
}
;