import baseApi from "./baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // crud
    getAllProducts: builder.query({
      query: ({page=0,size=12}) => `/products?page${page}&size${size}`,
    }),
    getSingleProducts: builder.query({
      query: (uuid) => `/products/${uuid}`,
    }),
    addNewProduct: builder.mutation({
      query: ({ createProduct}) => ({
        url: "/products",
        method: "POST",
        body: createProduct,
      }),
    }),
    updateProductByUuid: builder.mutation({
      query: ({ updateProduct, uuid }) => ({
        url: `/products/${uuid}`,
        method: "PUT",
        body: updateProduct,
      }),
    }),
    deleteProductByUuid: builder.mutation({
      query: ({ uuid }) => ({
        url: `/products/${uuid}`,
        method: "DELETE",
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
} = productApi;
