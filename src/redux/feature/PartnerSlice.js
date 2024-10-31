import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const fetchPartner = createAsyncThunk(
    "partner/fetchPartners",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/partner?page=${page}&size=${size}`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const fetchPartnerById = createAsyncThunk(
    "partner/fetchPartnersById",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/partners/search/user/id/${id}`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const updatePartner = createAsyncThunk(
    "partner/updatepartners",
    async (partner, { rejectWithValue }) => {
        try {
            console.log({ partner });
            const response = await axiosInstance.put(`/partners`, partner);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const deletepartner = createAsyncThunk(
    "partner/deletepartners",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/partners/${id}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const partnerSlice = createSlice({
    name: "partner",
    initialState: {
        partners: [],
        currentPartner: null,
        status: null,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPartner.fulfilled, (state, action) => {
                state.partners = action.payload.data;
                state.paging = action.payload.paging;
                state.status = "succeeded";
            })
            .addCase(fetchPartnerById.fulfilled, (state, action) => {
                state.currentPartner = action.payload.data;
                state.status = action.payload.message;
            })
            .addCase(updatePartner.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(deletepartner.fulfilled, (state, action) => {
                state.partners = state.partners.filter(
                    (emp) => emp.id == action.meta.arg
                );
                state.status = "succeeded";
            })
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.error = action.payload;
                    state.status = "failed";
                }
            );
    },
});

export default partnerSlice.reducer;
