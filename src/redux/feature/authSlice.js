import axiosInstance from "@/api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
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
        isLogin: null,
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
            state.isLogin = false;
            state.id = null;
            state.token = null;
            state.role = null;
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            localStorage.removeItem("role");
        },
        clear: (state) => {
            state.status = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                console.log(action.payload);
                state.isLogin = true;
                state.id = action.payload.data.id;
                state.token = action.payload.data.token;
                state.role = action.payload.data.role;
                state.status = action.payload.message;
                localStorage.setItem("token", action.payload.data.token);
                localStorage.setItem("role", action.payload.data.role);
                localStorage.setItem("id", action.payload.data.id);
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload.error;
                state.status = action.payload.message;
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
export const { setAuth, logout, clear } = authSLice.actions;
export default authSLice.reducer;
