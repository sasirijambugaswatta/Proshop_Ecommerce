import {apiSlice} from "./apiSlice.ts";
import {USERS_URL} from "../../contants.ts";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                credentials: "include",
                body: data
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                credentials: "include",
                body:data
            }),
        }),
        getUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}`,
                credentials: "include",
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method: 'DELETE',
                credentials: "include",
            }),
            invalidatesTags: ['User'],
        }),
        getUserDetails: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                credentials: "include",
            }),
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: `${USERS_URL}/${user._id}`,
                method: 'PUT',
                credentials: "include",
                body: user
            }),
            invalidatesTags: ['User'],
        }),
    })
})

export const {useLoginMutation
    ,useLogoutMutation
    , useRegisterMutation
    , useProfileMutation
,useGetUsersQuery,
useDeleteUserMutation
, useGetUserDetailsQuery
, useUpdateUserMutation} = usersApiSlice;