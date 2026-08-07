import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useState } from "react";
//prepare headers

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_ISHOP_URL,
    prepareHeaders: (headers, {getState}) =>{
        const token = getState().auth.accessToken;
        if(token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers;
    }
});
// Refresh token implementation 

const baseQueryWithReAuth = async (args, api, extraOptions) => {
let result = await baseQuery(args, api, extraOptions);

if (result?.error?.status === 401) {
    const refreshToken = sessionStorage.getItem('refreshToken');

    const res = await fetch(
    `${import.meta.env.VITE_BASE_ISHOP_URL}/auth/refresh`,
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
    },
    );
    if (res.ok) {
        const data = await res.json();
        console.log('==> new accessToken:', data?.accessToken);
        api.dispatch(setAccessToken(data?.accessToken));
        result = await baseQuery(args, api, extraOptions);
    } else {
        api.dispatch(setAccessToken(null));
    }
}

    return result;
};


const baseApi = createApi({
    reducerPath : 'baseApi',
    baseQuery : baseQueryWithReAuth,
    endpoints: () => ({})
})

export default baseApi;