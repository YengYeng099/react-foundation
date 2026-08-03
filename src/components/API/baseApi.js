import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//prepare headers

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_ISHOP_URL,
    prepareHeaders: (headers) =>{
        const token = import.meta.env.VITE_ACCESS_TOKEN
        if(token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers;
    }
});
const baseApi = createApi({
    reducerPath : 'baseApi',
    baseQuery,
    endpoints: () => ({})
})

export default baseApi;