import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts?_limit=4'
    )
    return response.data
})

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
    },
})

export const { addPost, removePost } = postSlice.actions

export default postSlice.reducer
