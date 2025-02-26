import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (data) => ({
        url: "/orders/create-order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders"],
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders/all-orders",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    updateOrder: builder.mutation({
      query: ({ orderId, status }: { orderId: string; status: string }) => {
        return {
          url: `/orders/update-order/${orderId}`,
          method: "PUT",
          body: { status },
        };
      },
      invalidatesTags: ["orders"],
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/delete-order/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
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
