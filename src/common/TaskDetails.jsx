import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



const TaskDetails = () => {

    const { id } = useParams()
    console.log(id)

    const [task, setTask] = React.useState([])
    const [comment, setComment] = useState([])
    const [commentText, setCommentText] = useState('')

    console.log(comment, "all comments by task id")

    console.log(task)

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
    }, [])

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
            }
        })
    }

    return (
        <div className='h-[85vh] w-full flex flex-col justify-center pt-12 px-12'>
            <div className='flex  gap-16 '>
                <div className='w-full'>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            {/* <h1 className='text-2xl font-bold'>Task Details</h1> */}
                            <div className='flex gap-2'>
                                <h1 className='text-xl font-bold'>Title : </h1>
                                <h1 className='text-xl font-bold'>{task.title}</h1>

                            </div>
                            <div className='flex gap-2 '>
                                <h1 className='text-xl font-bold'>Description : </h1>
                                <p>{task.description}</p>

                            </div>
                            <div className='flex gap-2 '>
                                <h1 className='text-xl font-bold'>Status : </h1>
                                <p>{task.status}</p>
                            </div>

                            <div className='flex gap-2'>
                                <h1 className='text-xl font-bold'>Assigned To : </h1>
                                {/* <p>{task.user}</p> */}
                                <p>unknown</p>

                            </div>
                        </div>
                    </div>

                </div>
                <div className='w-[700px]'>
                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col gap-2'>
                            {/* <h1 className='text-2xl font-bold'>Comments</h1> */}
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-xl font-bold'>Comments : </h1>

                                {comment.map((com) => (
                                    <div className='flex gap-2'>
                                        <p>{com.comment}</p>
                                        <p className='text-blue-500'> by {com.user.name}</p>
                                    </div>
                                ))}

                            </div>


                        </div>


                    </div>
                </div>

            </div>
            <div className='pt-12'>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-xl font-bold'>Add Comment</h1>
                        <textarea className='w-[300px] h-[100px] border-2 border-gray-300 rounded-md p-2' type='text' value={commentText} onChange={handleComment} />
                        <div>
                            <button className='bg-blue-500 inline-block text-white rounded-md p-2' type='submit'>Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskDetails