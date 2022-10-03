import React from 'react'
import s from './NewPostForm.module.scss'

function NewPostForm({
    titleValue,
    updateTitleText,
    bodyValue,
    updateBodyText,
    handleAction,
}) {
    return (
        <div>
            <div className={s.form}>
                <input
                    placeholder="Post title"
                    value={titleValue}
                    onChange={(e) => updateTitleText(e.target.value)}
                />
                <input
                    placeholder="Post body"
                    value={bodyValue}
                    onChange={(e) => updateBodyText(e.target.value)}
                />
                <button onClick={handleAction}>Add post</button>
            </div>
            <h5 className={s.warning}>
                * due to the fact that jsonplaceholder always generates the same
                key and I can&apos;t influence it - deleting one element you
                created will delete the rest of the elements you created
            </h5>
        </div>
    )
}

export default NewPostForm
