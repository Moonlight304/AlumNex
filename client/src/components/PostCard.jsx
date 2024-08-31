import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { toast, useToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom'

import { Like } from '../helpers/Like'
import { Dislike } from '../helpers/Dislike'
import { checkLiked } from '../helpers/checkLiked'

const backendURL = import.meta.env.VITE_backendURL;


export function PostCard({ postID }) {
    const [post, setPost] = useState({});
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
        async function getPosts() {
            try {
                const response = await axios.get(`${backendURL}/feed/${postID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('jwt_token')}`
                        }
                    }
                );
                const data = response.data;

                setPost(data.post);
                setLikeCount(data.post.likeCount);
            }
            catch (e) {
                toast.error('Error fetching post');
                console.log('Error fetching post : ' + e);
            }
        }

        getPosts();
        checkLiked(postID, setIsLiked);
    }, [postID]);

    useEffect(() => {
        if (post?.createdAt) {
            const date = parseISO(post.createdAt);
            const formattedTime = formatDistanceToNow(date, { addSuffix: true });
            setTimeAgo(formattedTime);
        }
    }, [post]);

    return (
        <div className="w-full md:w-3/4 px-4">
            <div className="bg-[#e5d4be] rounded-lg p-4 mb-4">
                <div className="flex items-center mb-6">
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
                        <h3 className="font-bold"> {post?.username} </h3>
                        <p className="text-sm text-gray-600"> {timeAgo} </p>
                    </div>
                </div>
                <p className="mb-6">
                    {post?.content}
                </p>
                <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        <div className='flex gap-3 items-center '>
                            {
                                isLiked
                                    ?
                                    <button
                                        onClick={() => Dislike(postID, setLikeCount, setIsLiked)}
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="red"
                                            stroke="red"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            ></path>
                                        </svg>
                                    </button>
                                    :

                                    <button
                                        onClick={() => Like(postID, setLikeCount, setIsLiked)}
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            ></path>
                                        </svg>
                                    </button>
                            }



                            {likeCount}
                        </div>
                        <button>
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                ></path>
                            </svg>
                        </button>
                        <button>
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <button className="bg-[#c7a97e] text-white px-4 py-2 rounded-full">
                        Read more
                    </button>
                </div>
            </div>
        </div>
    );
};