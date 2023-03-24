import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



const TaskDetails = () => {

    const { id } = useParams()
    console.log(id)

    const [task, setTask] = React.useState([])
    const [comment, setComment] = useState([])
    const [commentText, setCommentText] = useState('')
    const [reload, setReload] = useState(false)

    // console.log(comment, "all comments by task id")

    // console.log(task)

    useEffect(() => {
        axios.get(`http://localhost:9000/api/tasks/${id}`)
            .then((res) => {
                setTask(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:9000/api/tasks/${id}/comments`)
            .then((res) => {
                setComment(res.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [reload])

    const handleComment = (e) => {
        setCommentText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:9000/api/tasks/${id}/comments`, { comment: commentText },

            {
                headers: {
                    application: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then((res) => {
            console.log(res, "create task response");
            if (res.status === 200) {
                setCommentText('')
                setReload(!reload)
            }
        })
    }

    return (
        <div className='flex justify-center'>
            <div className='h-[85vh] w-full flex flex-col justify-center pt-12 px-12 border-2 my-5'>
                <div className='flex  gap-5 '>
                    <div className='w-full'>
                        <div className='flex flex-col gap-5'>
                            <div className='flex flex-col gap-5'>
                                {/* <h1 className='text-2xl font-bold'>Task Details</h1> */}
                                <div className='flex flex-row gap-2'>
                                    <h1 className='text-3xl font-bold text-blue-900 w-[90%]'>{task.title}</h1>
                                    <div>
                                    <button className='bg-green-600 shadow-2xl px-2 py-1 text-xs text-white rounded-sm'>{task.status}</button>
                                    </div>
                                </div>

                                <div className='flex gap-2 '>
                                    <p className='text-xl'>{task.description}</p>
                                </div>

                                {/* <div className='flex gap-2'>
                                <h1 className='text-xl font-bold'>Assigned To : </h1> */}
                                {/* <p>{task.user}</p> */}
                                {/* <p>unknown</p> */}

                                {/* </div> */}
                            </div>
                        </div>

                    </div>


                </div>
                <div className='pt-12'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-2'>
                            {/* <h1 className='text-xl font-bold'>Add Comment</h1> */}
                            <textarea className='w-full h-[40px] rounded-md px-3 py-1 border-b-2 border-b-gray-500 outline-none' type='text' placeholder='Please write a comment...' value={commentText} onChange={handleComment} />
                            <div className='flex justify-end'>
                                <button className='bg-blue-500 inline-block text-white rounded-md px-5 py-1' type='submit'>Post Comment</button>
                            </div>
                        </div>
                    </form>

                    <div className='mt-5'>
                            <h1 className='text-xl font-bold text-gray-700 mb-4'>Comments </h1>
                        <div className='flex flex-col gap-5 h-48 overflow-y-auto scrollbar'>
                            {comment.map((com) => (
                                <div className='flex flex-col gap-2'>
                                    <p className='text-blue-500 text-2xl font-semibold'> {com.user.name}</p>
                                    <p>{com.comment}</p>
                                </div>

                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskDetails