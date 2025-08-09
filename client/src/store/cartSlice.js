import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurants: {},
  totalPrice: 0,
  totalItems: 0,
};

const recalculateCart = (state) => {
  let totalPrice = 0;
  let totalItems = 0;
  for (const restaurantId in state.restaurants) {
    const restaurantCart = state.restaurants[restaurantId];
    for (const item of restaurantCart.items) {
      totalItems += item.qty;
      totalPrice += item.price * item.qty;
    }
  }
  state.totalItems = totalItems;
  state.totalPrice = totalPrice;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { menuItem, restaurantId, restaurantName } = action.payload;
      if (!state.restaurants[restaurantId]) {
        state.restaurants[restaurantId] = {
          restaurantName: restaurantName,
          items: [],
        };
      }
      const restaurantCart = state.restaurants[restaurantId];
      const existing = restaurantCart.items.find(x => x._id === menuItem._id);
      if(existing)
        existing.qty += 1;
      else
        restaurantCart.items.push({...menuItem, qty: 1});
      recalculateCart(state);
    },
    decreaseItemQuantity: (state, action) => {
      const {menuItem, restaurantId} = action.payload;
      const restaurantCart = state.restaurants[restaurantId];
      if(!restaurantCart) return;
      const existing = restaurantCart.items.find(x => x._id === menuItem._id);
      if(existing){
        if(existing.qty === 1){
          restaurantCart.items = restaurantCart.items.filter(x => x._id !== menuItem._id);
          if(restaurantCart.items.length === 0)
            delete state.restaurants[restaurantId];
        } else{
          existing.qty -= 1;
        }
      }
      recalculateCart(state);
    },
    removeFromCart: (state, action) => {
      const {menuItem, restaurantId} = action.payload;
      const restaurantCart = state.restaurants[restaurantId];
      if(!restaurantCart) return;
      const existing = restaurantCart.items.find(x => x._id === menuItem._id);
      if(existing){
        restaurantCart.items = restaurantCart.items.filter(x => x._id !== menuItem._id);
        if(restaurantCart.items.length === 0)
          delete state.restaurants[restaurantId];
      }
      recalculateCart(state);
    },
    clearCart: (state) => {
      state.restaurants = {};
      state.totalPrice = 0;
      state.totalItems = 0;
    },
  },
});

export const { addToCart, decreaseItemQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
