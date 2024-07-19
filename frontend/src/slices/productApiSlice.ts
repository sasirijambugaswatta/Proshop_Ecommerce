import {apiSlice} from "./apiSlice.ts";
import {PRODUCTS_URL, UPLOAD_URL} from "../../contants.ts";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({keyword,pageNumber}) => ({
                url: PRODUCTS_URL,
                credentials: "include",
                params: {keyword,pageNumber},
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
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${PRODUCTS_URL}/${id}`,
                method: 'delete',
                credentials: "include",
            }),
            invalidatesTags: ['Product'],
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'post',
                credentials: "include",
                body: data
            }),
            invalidatesTags: ['Product'],
        })
    })
})

export const {useGetProductsQuery,
    useCreateProductMutation,
    useUpdateProductsMutation,
useUploadProductImageMutation,
useDeleteProductMutation,
useCreateReviewMutation} = productApiSlice;