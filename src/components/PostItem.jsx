import React from 'react'
import { useDispatch } from 'react-redux'
import { AiFillCloseCircle } from 'react-icons/ai'
import { removePost } from '../store/postSlice'
import s from './PostItem.module.scss'

function PostItem({ id, title, body }) {
    const dispatch = useDispatch()

    return (
        <div className={s.post}>
            <span className={s.title}>{title}</span>
            <span className={s.body}>{body}</span>
            <AiFillCloseCircle onClick={() => dispatch(removePost({ id }))} />
        </div>
    )
}

export default PostItem
