import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Comments } from './Comments';
import { toast } from 'react-toastify';
import { Nav } from './Nav'

const backendURL = import.meta.env.VITE_backendURL;

export function ShowPost() {
    const { postID } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState('');
    const [commentsArray, setCommentsArray] = useState([]);

    function formatDate(dateStr) {
        const dateObj = new Date(dateStr);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return dateObj.toLocaleDateString('en-US', options);
    }

    async function handleCommentSubmit() {
        try {
            const response = await axios.post(`${backendURL}/feed/${postID}/comments/newComment`,
                { comment },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('jwt_token')}`
                    }
                }
            );
            const data = response.data;

            if (data.status === 'success') {
                setComment('');
                setCommentsArray(prevComments => [data.newComment, ...prevComments]);
                console.log('Comment added');
            } else {
                console.log('Error adding comment');
                toast.error('An error occurred');
            }
        } catch (e) {
            console.log(e.message);
            toast.error('An error occurred');
        }
    }

    useEffect(() => {
        async function getPost() {
            try {
                const response = await axios.get(`${backendURL}/feed/${postID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('jwt_token')}`
                        }
                    }
                );
                const data = response.data;

                if (data.status === 'success') {
                    console.log('Fetched post');
                    setPost(data.post);
                    setCommentsArray(data.post.comments);
                } else {
                    console.log('Error fetching post');
                    toast.error('An error occurred');
                }
            } catch (e) {
                console.log(e.message);
                toast.error('An error occurred');
            }
        }

        getPost();
    }, [postID]);

    return (
        <>

            <Nav />


            <div className="bg-[#EBE4D5] ps-10 md:ps-32 pt-10 md:pt-20">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{post?.title}</h1>
                <div className="flex items-center mb-4">
                    <svg
                        className="w-8 h-8 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        ></path>
                    </svg>
                    <div>
                        <p className="font-medium text-gray-700">{post?.username}</p>
                        <p className="text-gray-500">Posted on {formatDate(post?.createdAt)}</p>
                    </div>
                </div>

                <p className="text-3xl text-gray-600 mb-8 text-wrap ">{post?.content}</p>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">Comments</h2>

                <div>
                    {
                        commentsArray.length !== 0
                            ? commentsArray.map((comment, index) => (
                                <Comments key={index} comment={comment} />
                            ))
                            : <h1>No comments yet</h1>
                    }

                    <textarea
                        placeholder="Write your comment..."
                        value={comment}
                        className="w-full rounded-md border bg-[#EBE4D5] text-black border-gray-300 p-2 resize-none mb-4"
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>

                    <button
                        className="bg-[#D4B990] text-white font-bold py-2 px-4 rounded"
                        onClick={handleCommentSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>

        </>
    );
}
