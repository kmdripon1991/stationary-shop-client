import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/create-order",
        method: "POST",
        body: data,
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders/all-orders",
        method: "GET",
      }),
    }),
    updateOrder: builder.mutation({
      query: (orderId) => ({
        url: `/update-order/${orderId}`,
        method: "POST",
      }),
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/delete-order/${orderId}`,
        method: "POST",
      }),
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "orders/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useVerifyOrderQuery,
} = orderApi;
