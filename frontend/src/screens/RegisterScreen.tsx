import {FormEvent, useEffect, useState} from "react";
import {FormContainer} from "../Components/FormContainer.tsx";
import {Button, Col, Form, FormGroup, FormLabel, Row} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setCredentials} from "../slices/authSlice.ts";
import {toast} from "react-toastify";
import {LoaderScreen} from "./LoaderScreen.tsx";
import {useRegisterMutation} from "../slices/usersApiSlice.ts";
import {RootState} from "../Components/Header.tsx";

export const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [registerApiCall , {isLoading}] = useRegisterMutation();
    const {userInfo} = useSelector((state:RootState) => state.auth);

    const {search} = useLocation();

    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e:FormEvent) => {
        e.preventDefault();
       if(password !== confirmPassword){
           toast.error('Passwords do not match');
           return
       }else {
           try{
               const res = await registerApiCall({name,email, password}).unwrap();
               dispatch(setCredentials({...res}));
               navigate(redirect);
           }catch (err){
               if (err instanceof Error) {
                   toast.error(err.message);
               } else {
                   toast.error('An unknown error occurred');
               }
           }
       }

    };
    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>

                <FormGroup controlId={'name'} className={'my-3'}>
                    <FormLabel>Name</FormLabel>
                    <Form.Control
                        type={'text'}
                        placeholder={'Enter name'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormGroup>

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

                <FormGroup controlId={'confirmPassword'} className={'my-3'}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Form.Control
                        type={'password'}
                        placeholder={'Confirm password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </FormGroup>

                <Button type={'submit'} variant={'primary'} className={'my-3'} disabled={isLoading}>
                    Register
                </Button>

                {isLoading && <LoaderScreen/>}
            </Form>

            <Row className={'py-3'}>
                <Col>
                    Already have an account?
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                </Col>
            </Row>

        </FormContainer>
    );
};