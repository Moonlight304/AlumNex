import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

import { PostCard } from './PostCard';
const backendURL = import.meta.env.VITE_backendURL;


export function Feed() {
    const [postCount, setPostCount] = useState(0);
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            try {
                const response = await axios.get(`${backendURL}/feed`,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('jwt_token')}`
                        }
                    }
                );
                const data = response.data;

                if (data.status === 'success') {
                    console.log('Fetched posts');
                    setPostCount(data.count);
                    setAllPosts(data.data);

                    console.log(data.data);
                }
                else {
                    console.log('Error fetching posts');
                    toast.error(`An error occurred `);
                }
            }
            catch (e) {
                console.log(e.message);
                toast.error(`An error occurred `);
            }
        }

        getPosts();
    }, [])

    return (
        <div className="bg-[#ebe4d5]">
            <header className="bg-[#d4b990] p-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        ></path>
                    </svg>
                    <span className="font-bold">Campus Connect</span>
                    <nav className="hidden md:flex space-x-4">
                        <Link to={'/feed'} className="hover:underline"> Feed </Link>
                        <Link to={'/profiles'} className="hover:underline"> Profiles </Link>
                        <Link to={'/community'} className="hover:underline"> Groups </Link>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="md:hidden">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </button>

                    <Link to={'/feed/new_post'} className="hover:underline">
                        New Post
                    </Link>

                    <div className="hidden md:flex items-center bg-white rounded-full px-3 py-1">
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent outline-none"
                        />
                        <svg
                            className="w-5 h-5 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </div>
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        ></path>
                    </svg>
                    <svg
                        className="w-6 h-6"
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
                </div>
            </header>

            <main className="container mt-8 mx-8 flex flex-col md:flex-row">

                <div className="container flex flex-col">
                    {postCount !== 0
                        ? allPosts.map((post, index) => {
                            return <PostCard key={index} postID={post._id} />
                        })
                        :
                        <h1> No posts!! </h1>
                    }
                </div>


                <aside className="w-full md:w-1/4 px-4">
                    <div className="bg-[#f3e8d5] p-4 rounded-lg">
                        <h2 className="font-bold mb-4">Quick Links</h2>
                        <ul className="space-y-2">
                            <li>
                                <Link to={'/campus_map'} className="hover:underline">
                                    Campus Map
                                </Link>
                            </li>
                            <li>
                                <Link to={'/calendar'} className="hover:underline">
                                    Academic Calendar
                                </Link>
                            </li>
                            <li>
                                <Link to={'/library'} className="hover:underline">
                                    Library
                                </Link>
                            </li>
                            <li>
                                <Link to={'/student_portal'} className="hover:underline">
                                    Student Portal
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>
            </main>
        </div>
    );
};