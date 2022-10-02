import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/pposts?_limit=4'
            )
            return response.data
        } catch (error) {
            if (error.response.status >= 400 && error.response.status < 500) {
                return rejectWithValue('page not found, we will fix it soon')
            }
            if (error.response.status >= 500) {
                return rejectWithValue(
                    'technical work, we will restore everything soon'
                )
            }
            return rejectWithValue(error.message)
        }
    }
)

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        status: null,
        error: null,
    },
    reducers: {
        addPost(state, action) {
            state.posts.push({
                id: new Date().toISOString(),
                title: action.payload.title,
                body: action.payload.body,
            })
        },
        removePost(state, action) {
            state.posts = state.posts.filter(
                (post) => post.id !== action.payload.id
            )
        },
    },
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.status = 'loading'
            state.error = null
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'resolved'
            state.posts = action.payload
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'rejected'
            state.error = action.payload
        },
    },
})

export const { addPost, removePost } = postSlice.actions

export default postSlice.reducer
