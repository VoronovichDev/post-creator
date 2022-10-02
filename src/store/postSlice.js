import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
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
})

export const { addPost, removePost } = postSlice.actions

export default postSlice.reducer
