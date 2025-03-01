import {FormEvent, useEffect, useState} from "react";
import {FormContainer} from "../Components/FormContainer.tsx";
import {Button, Col, Form, FormGroup, FormLabel, Row} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useLoginMutation} from "../slices/usersApiSlice.ts";
import {setCredentials} from "../slices/authSlice.ts";
import {toast} from "react-toastify";
import {LoaderScreen} from "./LoaderScreen.tsx";
import {RootState} from "../Components/Header.tsx";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";

export const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginApiCall , {isLoading}] = useLoginMutation();
    const {userInfo} = useSelector((state:RootState) => state.auth);

    const {search} = useLocation();

    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await loginApiCall({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            if (isFetchBaseQueryError(err)) {
                // This is a FetchBaseQueryError
                const fetchError = err as FetchBaseQueryError;
                toast.error((fetchError.data as Error).message || 'An error occurred');
            } else {
                // This is a custom error
                toast.error((err as Error).message || 'An error occurred');
            }
        }
    };

    function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
        return typeof error === 'object' && error != null && 'status' in error;
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup controlId={'email'} className={'my-3'}>
                    <FormLabel>Email Address</FormLabel>
                    <Form.Control
                        type={'email'}
                        placeholder={'Enter email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>

                <FormGroup controlId={'password'} className={'my-3'}>
                    <FormLabel>Password</FormLabel>
                    <Form.Control
                        type={'password'}
                        placeholder={'Enter password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>

                <Button type={'submit'} variant={'primary'} className={'my-3'} disabled={isLoading}>
                    Sign In
                </Button>

                {isLoading && <LoaderScreen/>}
            </Form>

            <Row className={'py-3'}>
                <Col>
                    New Customer?
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>

        </FormContainer>
    );
};
