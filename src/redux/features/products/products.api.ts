import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/products/create-product",
        method: "POST",
        body: data,
      }),
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getSingleProduct: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
    }),
    searchProducts: builder.query({
      query: ({ name, category }) => {
        const params = new URLSearchParams();
        if (name) params.append("search", name);
        if (category) params.append("search", category);

        return {
          url: `/products?${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useSearchProductsQuery,
  // useGetProductsQuery,
} = productsApi;
