import { createApi } from "@reduxjs/toolkit/query";
import baseApi from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        UserLogin: builder.mutation({
            query:({userLoginRequest}) => ({
                url : 'auth/login',
                method: 'POST',
                body: userLoginRequest,
            })
        }),
        UserRegister: builder.mutation({
            query:({userRegisterRequest}) =>({
                url:'/users/users-signip',
                method: 'POST',
                body : userLoginRequest
            })
        })
    })
})
export const {
    useUserLoginMutation,
    useUserRegisterMutation
} = authApi