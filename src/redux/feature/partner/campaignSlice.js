import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createCampaign = createAsyncThunk(
    "campaign/createCampaign",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/campaign`, data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to create");
        }
    }
);

export const getCampaignByPartnerId = createAsyncThunk(
    "campaign/getCampaignByPartnerId",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/campaign/partner/${id}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to fetch");
        }
    }
);

export const updateCampaignByPartnerId = createAsyncThunk(
    "campaign/updateCampaignByPartnerId",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`/campaign/${id}`, data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to update");
        }
    }
);

export const stopCampaignById = createAsyncThunk(
    "campaign/stopCampaignById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(`/campaign/${id}/stop`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to update");
        }
    }
);

const campaignSlice = createSlice({
    name: "campaign",
    initialState: {
        campaigns: null,
        currentCampaign: null,
        currentCampaignUrl: null,
        status: null,
    },
    reducers: {
        clearCampaignStatus: (state) => {
            state.status = null;
        },
        clearCurrentCampaign: (state) => {
            state.currentCampaign = null;
            state.currentCampaignUrl = null;
        },
        setCurrentCampaign: (state, action) => {
            state.currentCampaign = action.payload.item;
            state.currentCampaignUrl = action.payload.imageUrl;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCampaign.fulfilled, (state) => {
                state.status = "success";
            })
            .addCase(createCampaign.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(getCampaignByPartnerId.fulfilled, (state, action) => {
                state.campaigns = action.payload.data;
                state.status = "success";
            })
            .addCase(getCampaignByPartnerId.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(updateCampaignByPartnerId.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(updateCampaignByPartnerId.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(stopCampaignById.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(stopCampaignById.rejected, (state) => {
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

export const { clearCampaignStatus, clearCurrentCampaign, setCurrentCampaign } =
    campaignSlice.actions;

export default campaignSlice.reducer;
