import {apiSlice} from "./apiSlice.ts";
import {PRODUCTS_URL} from "../../contants.ts";

const getSingleProduct = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSingleProduct: builder.query({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
            }),
        }),
    }),
});

export const {useGetSingleProductQuery} = getSingleProduct;