import { useSelector } from 'react-redux'
import React from 'react'
import PostItem from './PostItem'
import s from './Posts.module.scss'

function Posts() {
    const posts = useSelector((state) => state.posts.posts)

    return (
        <div className={s.posts}>
            {posts.map((post) => (
                <PostItem key={post.id} {...post} />
            ))}
        </div>
    )
}

export default Posts
