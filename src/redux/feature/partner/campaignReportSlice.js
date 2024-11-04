import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createCampaignReport = createAsyncThunk(
    "campaignReport/createCampaignReport",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/campaign-report`, data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to create");
        }
    }
);

export const getCampaignReportByPartnerId = createAsyncThunk(
    "campaignReport/getCampaignReportByPartnerId",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/campaign-report/partner/${id}`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to fetch");
        }
    }
);

export const deleteCampaignReportById = createAsyncThunk(
    "campaignReport/deleteCampaignReportByPartnerId",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/campaign-report/${id}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data || "Failed to delete");
        }
    }
);

const campaignReportSlice = createSlice({
    name: "campaignReport",
    initialState: {
        campaignReports: null,
        currentCampaignReport: null,
        currentCampaignReportUrl: null,
        status: null,
    },
    reducers: {
        clearCampaignReportStatus: (state) => {
            state.status = null;
        },
        clearCurrentCampaignReport: (state) => {
            state.currentCampaign = null;
            state.currentCampaignReportUrl = null;
        },
        setCurrentCampaignReport: (state, action) => {
            state.currentCampaign = action.payload.item;
            state.currentCampaignReportUrl = action.payload.imageUrl;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCampaignReport.fulfilled, (state) => {
                state.status = "success";
            })
            .addCase(createCampaignReport.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(
                getCampaignReportByPartnerId.fulfilled,
                (state, action) => {
                    state.campaigns = action.payload.data;
                    state.status = "success";
                }
            )
            .addCase(getCampaignReportByPartnerId.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(deleteCampaignReportById.fulfilled, (state, action) => {
                console.log(action.payload);
                state.status = "success";
            })
            .addCase(deleteCampaignReportById.rejected, (state) => {
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

export const {
    clearCampaignReportStatus,
    clearCurrentCampaignReport,
    setCurrentCampaignReport,
} = campaignReportSlice.actions;

export default campaignReportSlice.reducer;
