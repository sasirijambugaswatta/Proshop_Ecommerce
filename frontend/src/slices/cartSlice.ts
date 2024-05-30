/* eslint-disable */
import {createSlice} from "@reduxjs/toolkit";



const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItem : []};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
    },
    reducers: {
        addToCart : (state,action)=>{
            const item = action.payload;

            // @ts-ignore
            const existItem = state.cartItems.find((x)=>x?._id === item.id);

            if(existItem){

                // @ts-ignore
                state.cartItems = state.cartItems.map((x) => x?._id === existItem?._id ? item : x);
            }else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                state.cartItems = [...state.cartItems, item]
            }

            //Calculate item price

            // @ts-ignore
            state.itemsPrice = addDecimal(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
            //Calculate shipping price
            // @ts-ignore
            state.shippngPrice = addDecimal(state.itemPrice > 100 ? 0: 10);
            //Calculate tax price
            // @ts-ignore
            state.taxPrice = addDecimal(Number((0.15 * state.itemsPrice).toFixed(2)));
            //Calculate total price
            // @ts-ignore
            state.totalPrice = Number((state.itemsPrice + state.shippngPrice + state.taxPrice).toFixed(2));

            localStorage.setItem("cart", JSON.stringify(state));
        },
        removeFromCart : ()=>{
        }
    }

});

const addDecimal = (num:number) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

export const {addToCart} = cartSlice.actions;

export default cartSlice.reducer;