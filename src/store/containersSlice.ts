import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Container } from "../types/container";
import {
  deleteContainersApi,
  fetchContainersApi,
  FetchContainersParams,
} from "../services/containersApi";

type ContainersState = {
  items: Container[];
  allItems: Container[];
  loading: boolean;
  error: string | null;
  search: string;
  status: string | null;
};

const initialState: ContainersState = {
  items: [],
  allItems: [],
  loading: false,
  error: null,
  search: "",
  status: null,
};

export const fetchContainers = createAsyncThunk<
  { items: Container[] },
  FetchContainersParams | undefined
>("containers/fetchAll", async (args) => {
  const data = await fetchContainersApi(args);
  return { items: data };
});

export const deleteContainers = createAsyncThunk<string[], string[]>(
  "containers/deleteMany",
  async (ids) => {
    await deleteContainersApi(ids);
    return ids;
  }
);

const containersSlice = createSlice({
  name: "containers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContainers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContainers.fulfilled, (state, action) => {
        state.loading = false;
        const { search, status } = action.meta.arg ?? {};

        state.items = action.payload.items;

        state.search = search ?? "";
        state.status = status ?? null;

        if (!search && !status) {
          state.allItems = action.payload.items;
        }
      })
      .addCase(fetchContainers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Ошибка загрузки контейнеров";
      })
      .addCase(deleteContainers.fulfilled, (state, action) => {
        const deletedIds = new Set(action.payload);
        state.items = state.items.filter(
          (item) => !deletedIds.has(item.id.toString())
        );
        state.allItems = state.allItems.filter(
          (item) => !deletedIds.has(item.id.toString())
        );
      });
  },
});

export default containersSlice.reducer;
