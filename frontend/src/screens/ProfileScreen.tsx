import {FormEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Form, FormControl, FormGroup, FormLabel, Row, Table} from "react-bootstrap";
import {toast} from "react-toastify";
import {setCredentials} from "../slices/authSlice.ts";
import {useProfileMutation} from "../slices/usersApiSlice.ts";
import {useGetUserOrdersQuery} from "../slices/ordersApiSlice.ts";
import {Message} from "../Components/Message.tsx";
import {LoaderScreen} from "./LoaderScreen.tsx";
import {FaTimes} from "react-icons/fa";
import {LinkContainer} from "react-router-bootstrap";
import {RootState, UserInfo} from "../Components/Header.tsx";
import {SerializedError} from "@reduxjs/toolkit";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";

export interface Order {
    _id: string;
    createdAt: string;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: string;
    isDelivered: boolean;
    deliveredAt?: string;
    user:UserInfo
}


export const ProfileScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();

    const {userInfo} = useSelector((state: RootState) => state.auth);

    const [updateProfile] = useProfileMutation();

    const {data: orders, isLoading, error} =  useGetUserOrdersQuery("");

    useEffect(() => {

        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo.name, userInfo.email, userInfo]);

    const submitHandler = async (e:FormEvent) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error('Password does not match');
        }else {
            try {
                const res = await updateProfile({_id:userInfo._id , name, email, password}).unwrap();
                dispatch(setCredentials({...res}));
                toast.success('Profile updated successfully');
            } catch (err) {
                if (err instanceof Error) {
                    toast.error(err.message);
                } else {
                    toast.error('An unknown error occurred');
                }
            }
        }
    }

    const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined): string => {
        if (!error) {
            return 'An unknown error occurred';
        }

        if ('data' in error) {
            // This is a FetchBaseQueryError
            return (error.data as { message: string })?.message || 'An error occurred';
        }

        if ('message' in error && error.message) {
            return error.message;
        }

        return 'An error occurred';
    };

    return (
        <>
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>
                    <Form onSubmit={submitHandler}>
                        <FormGroup controlId="name" className={'my-2'}>
                            <FormLabel>Name</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup controlId="email" className={'my-2'}>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup controlId="password" className={'my-2'}>
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup controlId="confirmPassword" className={'my-2'}>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl
                                type="password"
                                placeholder="Enter confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" variant="primary">
                                Update
                            </Button>
                        </FormGroup>

                    </Form>

                </Col>
                <Col md={9}>
                    <h2>My Orders</h2>
                    {isLoading ? (<LoaderScreen/>) : error ? <Message variant={'danger'}>{getErrorMessage(error)} </Message> : (
                        <Table striped bordered={true} hover={true} responsive className={'table-sm'}>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders?.map((order: Order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt!.substring(0, 10) : (
                                        <FaTimes color={'red'}/>
                                    )}</td>
                                    <td>{order.isDelivered ? order.deliveredAt!.substring(0, 10) : (
                                        <FaTimes color={'red'}/>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className={'btn-sm'}>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </>
    );
};