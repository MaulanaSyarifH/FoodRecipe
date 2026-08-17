import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const food = action.payload;
      const existingIndex = state.favoriterecipes.findIndex(
        (item) =>
          item.idFood === food.idFood ||
          (food.title && item.title === food.title)
      );
      if (existingIndex >= 0) {
        state.favoriterecipes.splice(existingIndex, 1);
      } else {
        state.favoriterecipes.push(food);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
