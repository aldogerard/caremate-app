import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginPartner = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/auth/login`, data);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

export const registerPartner = createAsyncThunk(
    "auth/register",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                `/auth/register/partner`,
                data
            );
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const authSLice = createSlice({
    name: "auth",
    initialState: {
        isLogin: false,
        token: null,
        role: null,
        id: null,
        status: null,
        error: null,
    },
    reducers: {
        setAuth: (state, action) => {
            const { token, role, id } = action.payload;
            state.token = token;
            state.isLogin = !!token;
            state.id = id;
            state.role = role;
        },
        logout: (state, action) => {
            state.token = "";
            state.isLogin = "";
            state.role = "";
            localStorage.removeItem("token");
        },
        clearAuth: (state) => {
            state.isLogin = false;
            state.token = null;
            state.role = null;
            state.id = null;
            state.status = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginPartner.fulfilled, (state, action) => {
                state.isLogin = true;
                state.token = action.payload.data.token;
                state.role = action.payload.data.role;
                state.status = "succeeded";
                localStorage.setItem("token", action.payload.data.token);
            })
            .addCase(registerPartner.fulfilled, (state, action) => {
                state.status = action.payload.message;
            })
            .addCase(registerPartner.rejected, (state, action) => {
                state.error = action.payload.error;
                state.status = action.payload.message;
            })
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.error = action.payload;
                }
            );
    },
});
export const { setAuth, logout, clearAuth } = authSLice.actions;
export default authSLice.reducer;
