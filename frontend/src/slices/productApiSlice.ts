import {apiSlice} from "./apiSlice.ts";
import {PRODUCTS_URL} from "../../contants.ts";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5,
        })
    })
})

export const {useGetProductsQuery} = productApiSlice;