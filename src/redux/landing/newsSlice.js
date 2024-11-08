import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://10.10.102.91:1337/api'; 

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await axios.get(`${BASE_URL}/news`);
  return response.data; 
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    newsItems: [],
    error: null,
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.newsItems = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});