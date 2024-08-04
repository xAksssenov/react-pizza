import { createSlice } from "@reduxjs/toolkit";
import { sortList } from "../../components/Sort";

export interface FilterState {
  categoryId: number;
  pageCount: number;
  sort: {
    name: string;
    sortProperty: string;
  };
}

const initialState: FilterState = {
  categoryId: 0,
  pageCount: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = Number(action.payload.categoryId);
      state.pageCount = Number(action.payload.pageCount);
      state.sort =
        sortList.find(
          (sort) => sort.sortProperty === action.payload.sortProperty
        ) || initialState.sort;
    },
  },
});

export const { setCategoryId, setSort, setPageCount, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
