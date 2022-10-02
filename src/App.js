import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addPost } from './store/postSlice'
import NewPostForm from './components/NewPostForm'
import Posts from './components/Posts'
import s from './App.module.scss'

function App() {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const dispatch = useDispatch()

    const handleAction = () => {
        if (title.trim().length) {
            dispatch(addPost({ title, body }))
            setTitle('')
            setBody('')
        }
    }

    return (
        <div className={s.App}>
            <NewPostForm
                titleValue={title}
                updateTitleText={setTitle}
                bodyValue={body}
                updateBodyText={setBody}
                handleAction={handleAction}
            />
            <Posts />
        </div>
    )
}

export default App
