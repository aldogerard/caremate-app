import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllCampaign = createAsyncThunk(
    "campaign/getAllCampaign",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/campaign`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Fetch to failed");
        }
    }
);

export const approveCampaign = createAsyncThunk(
    "campaign/approveCampaign",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `/campaign/${id}/approve`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Fetch to failed");
        }
    }
);

export const rejectCampaign = createAsyncThunk(
    "campaign/rejectCampaign",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                `/campaign/${id}/reject`,
                data
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Fetch to failed");
        }
    }
);

const adminCampaignSlice = createSlice({
    name: "adminCampaign",
    initialState: {
        campaigns: null,
        currentCampaign: null,
        currentCampaignUrl: null,
        status: null,
    },
    reducers: {
        setCurrentCampaign: (state, action) => {
            state.currentCampaign = action.payload.item;
            // state.currentCampaignUrl = action.payload.imageUrl;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCampaign.fulfilled, (state, action) => {
                state.campaigns = action.payload.data;
                state.status = "success";
            })
            .addCase(getAllCampaign.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(approveCampaign.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(approveCampaign.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(rejectCampaign.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(rejectCampaign.rejected, (state) => {
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

export const { setCurrentCampaign } = adminCampaignSlice.actions;
export default adminCampaignSlice.reducer;
