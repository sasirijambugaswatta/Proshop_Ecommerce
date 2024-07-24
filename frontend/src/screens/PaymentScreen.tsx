import {FormEvent, useEffect, useState} from "react";
import {FormContainer} from "../Components/FormContainer.tsx";
import {CheckoutSteps} from "../Components/CheckoutSteps.tsx";
import {Button, Col, Form, FormCheck, FormGroup, FormLabel} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {savePaymentMethod} from "../slices/cartSlice.ts";
import {CartItem, RootState} from "../Components/Header.tsx";

export const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state:RootState) => state.cart);

    const {shippingAddress} = cart as CartItem;

    useEffect(() => {
        if(!shippingAddress) navigate('/shipping');
    }, [shippingAddress, navigate]);

    const submitHandler = (e:FormEvent) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <FormLabel as={'legend'}>Select Method</FormLabel>
                    <Col>
                        <FormCheck type={'radio'}
                                   className={'my-2'}
                                   label={'PayPal or Credit card'}
                                   id={'PayPal'}
                                   name={'paymentMethod'}
                                   value={'PayPal'} checked={true}
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                        </FormCheck>
                    </Col>
                </FormGroup>
                <Button type={'submit'} variant={'primary'}>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};