import {apiSlice} from "./apiSlice.ts";
import {ORDERS_URL} from "../../contants.ts";

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'post',
                credentials: "include",
                body: {...order}
            }),
        }),
        getOrderDetails: builder.query({
            query: (orderId:string) => ({
                url: `${ORDERS_URL}/${orderId}`,
                credentials: "include"
            }),
            keepUnusedDataFor: 5,
        }),
    })
});

export const {useCreateOrderMutation, useGetOrderDetailsQuery} = ordersApiSlice