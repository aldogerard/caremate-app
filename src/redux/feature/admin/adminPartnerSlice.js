import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllPartner = createAsyncThunk(
    "partner/getAllPartner",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/partner`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Fetch to failed");
        }
    }
);

export const rejectPartner = createAsyncThunk(
    "partner/approvePartner",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `/partner/${id}/reject`,
                data
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Fetch to failed");
        }
    }
);

export const approvePartner = createAsyncThunk(
    "partner/approvePartner",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `/partner/${id}/approve`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Fetch to failed");
        }
    }
);

const adminPartnerSlice = createSlice({
    name: "partner",
    initialState: {
        partners: null,
        currentPartner: null,
        currentCampaignPartnerUrl: null,
        status: null,
    },
    reducers: {
        setCurrentPartner: (state, action) => {
            state.currentPartner = action.payload.item;
            // state.currentCampaignPartnerUrl = action.payload.imageUrl;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPartner.fulfilled, (state, action) => {
                state.partners = action.payload.data;
                state.status = "success";
            })
            .addCase(getAllPartner.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(approvePartner.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(approvePartner.rejected, (state) => {
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

export const { setCurrentPartner } = adminPartnerSlice.actions;
export default adminPartnerSlice.reducer;
