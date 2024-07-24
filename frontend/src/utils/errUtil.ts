import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

export const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined): string => {
    if (!error) {
        return 'An unknown error occurred';
    }
    if ('data' in error) {
        // This is a FetchBaseQueryError
        return (error.data as { message: string })?.message || 'An error occurred';
    }
    if ('message' in error && error.message) {
        return error.message;
    }
    return 'An error occurred';
};