import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/posts?_limit=4'
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

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async (id, { rejectWithValue, dispatch }) => {
        try {
            // eslint-disable-next-line no-unused-vars
            const response = await axios.delete(
                `https://jsonplaceholder.typicode.com/posts/${id}`
            )
            return dispatch(removePost({ id }))
        } catch (error) {
            if (error.response.status >= 400) {
                return rejectWithValue(
                    "sorry, can't delete post. We are already fixing it"
                )
            }
            return rejectWithValue(error.message)
        }
    }
)

// write with fetch because of the "non-serializable value" while trying to imlement this logic with axios
export const addPostAsync = createAsyncThunk(
    'posts/addPostAsync',
    // eslint-disable-next-line consistent-return
    async (text, { rejectWithValue, dispatch }) => {
        try {
            // ! jsonplaceholder assigns the same key, so it is not possible to get rid of the error with the unique keys
            const newPost = {
                userId: 1,
                title: text.title,
                body: text.body,
            }
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/posts',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(newPost),
                }
            )
            const data = await response.json()
            dispatch(addPost(data))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

// This is an attempt to implement logic using axios

// export const addPostAsync = createAsyncThunk(
//     'posts/addPostAsync',
//     // eslint-disable-next-line consistent-return
//     async (text, { rejectWithValue, dispatch }) => {
//         try {
//             const newPost = {
//                 userId: 1,
//                 title: text.title,
//                 body: text.body,
//             }
//             const response = await axios.post(
//                 'https://jsonplaceholder.typicode.com/posts',
//                 JSON.stringify(newPost),
//                 {
//                     headers: {
//                         'Content-type': 'application/json; charset=UTF-8',
//                     },
//                 }
//             )
//             console.log(response.data)
//             dispatch(addPost(response.data))
//             return response
//         } catch (error) {
//             if (error.response.status >= 400) {
//                 return rejectWithValue(
//                     "sorry, can't add post. We are already fixing it"
//                 )
//             }
//             return rejectWithValue(error.message)
//         }
//     }
// )

const setError = (state, action) => {
    state.status = 'rejected'
    state.error = action.payload
}

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        status: null,
        error: null,
    },
    reducers: {
        addPost(state, action) {
            state.posts.push(action.payload)
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
        [fetchPosts.rejected]: setError,
        [deletePost.rejected]: setError,
    },
})

const { addPost, removePost } = postSlice.actions

export default postSlice.reducer
