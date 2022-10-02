import React from 'react'

function NewPostForm({
    titleValue,
    updateTitleText,
    bodyValue,
    updateBodyText,
    handleAction,
}) {
    return (
        <label>
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
        </label>
    )
}

export default NewPostForm
