import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ecommerceApi = createApi({
  reducerPath: "ecommerceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_ISHOP_URL,
  }),
  endpoints: (builder) => ({
    // crud
    getAllProducts: builder.query({
      query: () => "/products",
    }),
    getSingleProducts: builder.query({
      query: (uuid) => `/products/${uuid}`,
    }),
    addNewProduct: builder.mutation({
      query: ({ createProduct, accessToken }) => ({
        url: "/products",
        method: "POST",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: createProduct,
      }),
    }),
    updateProductByUuid: builder.mutation({
      query: ({ updateProduct, accessToken, uuid }) => ({
        url: `/products/${uuid}`,
        method: "PUT",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
        body: updateProduct,
      }),
    }),
    deleteProductByUuid: builder.mutation({
      query: ({ accessToken, uuid }) => ({
        url: `/products/${uuid}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductsQuery,
  useAddNewProductMutation,
  useUpdateProductByUuidMutation,
  useDeleteProductByUuidMutation,
} = ecommerceApi;
