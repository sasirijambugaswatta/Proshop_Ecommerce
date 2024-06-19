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
        getOrders: builder.query({
            query: () => ({
                url: ORDERS_URL,
            }),
            keepUnusedDataFor: 5,
        }),
    })
});

export const {useCreateOrderMutation, useGetOrdersQuery} = ordersApiSlice