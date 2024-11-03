import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const fetchPartnerDocByUserId = createAsyncThunk(
    "partnerDoc/fetchPartnerDocByUserId",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/partner/document/${id}/users`
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const createPartnerDoc = createAsyncThunk(
    "partnerDoc/createPartnerDocs",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                `/partner/documents`,
                data
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const PartnerDocSlice = createSlice({
    name: "PartnerDoc",
    initialState: {
        PartnerDocs: [],
        currentPartnerDoc: null,
        url: null,
        status: null,
        error: null,
    },
    reducers: {
        clearUrl: (state) => {
            state.url = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPartnerDocByUserId.fulfilled, (state, action) => {
                const { data } = action.payload;
                state.currentPartnerDoc = {
                    rc: data.rc,
                    fr: data.fr,
                    ffp: data.ffp,
                    cfe: data.cfe,
                };
                state.paging = action.payload.paging;
                state.status = "succeeded";
            })
            .addCase(createPartnerDoc.fulfilled, (state, action) => {
                state.status = action.payload.message;
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

export const { clearUrl } = PartnerDocSlice.actions;
export default PartnerDocSlice.reducer;
