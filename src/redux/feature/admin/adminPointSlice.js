import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllPoint = createAsyncThunk(
    "point/getAllPoint",
    async (data, { rejectWithValue }) => {
        const page = data?.page || 0;
        const size = data?.size || 8;

        try {
            const response = await axiosInstance.get(
                `/point-transaction?page=${page}&size=${size}`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to fetch");
        }
    }
);

export const getPointById = createAsyncThunk(
    "point/getPointById",
    async (data, { rejectWithValue }) => {
        const id = data?.id;
        const size = data?.size;
        const page = data?.page;

        try {
            const response = await axiosInstance.get(
                `/point-transaction/donor/${id}?page=${page}&size=${size}`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to fetch");
        }
    }
);

const adminPointSlice = createSlice({
    name: "adminPoint",
    initialState: {
        points: null,
        paging: {
            page: 0,
            size: 8,
            totalPages: 0,
            totalElements: 0,
        },
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPoint.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.paging = {
                    page: data.pageable.pageNumber,
                    size: data.size,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                };
                state.points = data.content;
                state.status = "success";
            })
            .addCase(getAllPoint.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(getPointById.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.paging = {
                    page: data.pageable.pageNumber,
                    size: data.size,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                };
                state.points = data.content;
                state.status = "success";
            })
            .addCase(getPointById.rejected, (state) => {
                state.status = "failed";
            })

            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state) => {
                    state.status = "failed";
                }
            );
    },
});

export default adminPointSlice.reducer;
