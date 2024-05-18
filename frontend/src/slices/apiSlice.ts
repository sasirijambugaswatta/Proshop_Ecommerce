import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../../contants.ts";

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product','Order','User'],
    endpoints: () => ({}),
})