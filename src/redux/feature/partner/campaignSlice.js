import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createCampaign = createAsyncThunk(
    "campaign/createCampaign",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/campaign/${id}`, data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Fetch to update");
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
            return rejectWithValue(e.response?.data || "Fetch to failed");
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
