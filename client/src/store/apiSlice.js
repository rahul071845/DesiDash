import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Restaurant", "Order"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),
    getRestaurants: builder.query({
      query: () => "/restaurants",
      providesTags: ["Restaurant"],
    }),
    getRestaurant: builder.query({
      query: (id) => `/restaurants/${id}`,
      providesTags: (result, error, id) => [{ type: "Restaurant", id }],
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
      }),
    }),
    getMyOrders: builder.query({
      query: () => "/orders/myorders",
      providesTags: ["Order"],
    }),
    getMyRestaurants: builder.query({
      query: () => "/restaurants/myrestaurants",
      providesTags: ["Restaurant"],
    }),
    getRestaurantOrders: builder.query({
      query: (restaurantId) => `/orders/restaurant/${restaurantId}`,
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
    createRestaurant: builder.mutation({
      query: (data) => ({
        url: "/restaurants",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Restaurant"],
    }),
    addMenuItem: builder.mutation({
      query: ({ restaurantId, data }) => ({
        url: `/restaurants/${restaurantId}/menuitems`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Restaurant", id: arg.restaurantId },
      ],
    }),
    updateMenuItem: builder.mutation({
      query: ({ menuItemId, data }) => ({
        url: `/menuitems/${menuItemId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Restaurant"],
    }),
    deleteMenuItem: builder.mutation({
      query: (menuItemId) => ({
        url: `/menuitems/${menuItemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Restaurant"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetRestaurantsQuery,
  useGetRestaurantQuery,
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetMyRestaurantsQuery,
  useGetRestaurantOrdersQuery,
  useUpdateOrderStatusMutation,
  useCreateRestaurantMutation,
  useAddMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
} = apiSlice;
