import {apiSlice} from "./apiSlice.ts";
import {PRODUCTS_URL, UPLOAD_URL} from "../../contants.ts";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            providesTags: ['Product'],
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: (product) => ({
                url: PRODUCTS_URL,
                method: 'post',
                credentials: "include",
                body: {...product}
            }),
        }),
        updateProducts: builder.mutation({
            query: (product) => ({
                url: `${PRODUCTS_URL}/${product._id}`,
                method: 'put',
                credentials: "include",
                body: product
            }),
            invalidatesTags: ['Product'],
        }),
        uploadProductImage: builder.mutation({
            query: (image) => ({
                url: `${UPLOAD_URL}`,
                method: 'post',
                credentials: "include",
                body: image
            }),
        }),
    })
})

export const {useGetProductsQuery,
    useCreateProductMutation,
    useUpdateProductsMutation,
useUploadProductImageMutation} = productApiSlice;