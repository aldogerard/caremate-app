import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllWithdrawal = createAsyncThunk(
    "withdrawal/getAllWithdrawal",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/withdrawal`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to fetch");
        }
    }
);

export const approveWithdrawal = createAsyncThunk(
    "withdrawal/approveWithdrawal",
    async ({ id, file }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `/withdrawal/${id}/approve`,
                file
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to approve");
        }
    }
);

export const rejectWithdrawal = createAsyncThunk(
    "withdrawal/rejectWithdrawal",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `/withdrawal/${id}/reject`,
                data
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to reject");
        }
    }
);

const adminWithdrawalSlice = createSlice({
    name: "adminwithdrawal",
    initialState: {
        withdrawals: null,
        currentWithdrawal: null,
        currentWithdrawalUrl: null,
        status: null,
    },
    reducers: {
        setCurrentWithdrawal: (state, action) => {
            state.currentWithdrawal = action.payload.item;
            // state.currentWithdrawalUrl = action.payload.imageUrl;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllWithdrawal.fulfilled, (state, action) => {
                state.withdrawals = action.payload.data;
                state.status = "success";
            })
            .addCase(getAllWithdrawal.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(approveWithdrawal.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(approveWithdrawal.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(rejectWithdrawal.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(rejectWithdrawal.rejected, (state) => {
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

export const { setCurrentWithdrawal } = adminWithdrawalSlice.actions;
export default adminWithdrawalSlice.reducer;
