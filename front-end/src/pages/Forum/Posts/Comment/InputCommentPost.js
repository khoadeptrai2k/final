import React,{useState} from 'react'

export const InputCommentPost = ({comment, post}) => {
    const [contentCmt, setContentCmt] = useState('')

    const handleSubmitComment = (e) =>{
        e.preventDefault()
        if(!contentCmt.trim()) return;
        const newComment = {
            user: auth.userHeader,
            contentCmt,
            likes:[],
            createAt: new Date().toISOString()
            }
            console.log(newComment)
        }
  return (
    <div>
        <form className="card-footer inputCommentPost" onSubmit={handleSubmit}>
            <input type="text" placeholder="Comment something..."
                value={contentCmt} onChange={e => setContentCmt(e.target.value)} />

            <button type="submit" className="postBtn">
                Comment
            </button>
        </form>
    </div>
  )
}
