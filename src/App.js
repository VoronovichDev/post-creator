import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, addPostAsync } from './store/postSlice'
import NewPostForm from './components/NewPostForm'
import Posts from './components/Posts'
import s from './App.module.scss'

function App() {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const { status, error } = useSelector((state) => state.posts)
    const dispatch = useDispatch()

    const handleAction = () => {
        if (title.trim().length && body.trim().length) {
            dispatch(addPostAsync({ title, body }))
            setTitle('')
            setBody('')
        }
    }

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    return (
        <div className={s.App}>
            <NewPostForm
                titleValue={title}
                updateTitleText={setTitle}
                bodyValue={body}
                updateBodyText={setBody}
                handleAction={handleAction}
            />
            {status === 'loading' && <h2>Loading...</h2>}
            {error && <h2>Error: {error}</h2>}
            <Posts />
        </div>
    )
}

export default App
