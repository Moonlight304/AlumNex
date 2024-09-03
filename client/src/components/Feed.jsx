import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

import { PostCard } from './PostCard';
import { Nav } from './Nav'
const backendURL = import.meta.env.VITE_backendURL;


export function Feed() {
    const [filters, setFilters] = useState('');
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

    useEffect(() => {
        async function handleFilters() {
            try {
                const response = await axios.get(`${backendURL}/feed?filters=${filters}`,
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

        handleFilters();
    }, [filters])



    return (
        <div className="bg-[#ebe4d5]">

            <Nav />

            <div className="flex gap-5 items-center pt-5 px-5">
                <svg className='w-5 h-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32l432 0c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9 320 448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6l0-79.1L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
                </svg>
                <select
                    name="filters"
                    id="filters"
                    onChange={(e) => setFilters(e.target.value)}
                >
                    <option value=""> All </option>
                    <option value="success story"> Success stories </option>
                    <option value="achievement"> Achievements </option>
                    <option value="article"> Articles </option>
                </select>
            </div>


            <main className="container mt-8 flex flex-col md:flex-row">

                <div className="container flex flex-col">
                    {postCount !== 0
                        ? allPosts.map((post, index) => {
                            return <PostCard key={index} postID={post._id} />
                        })
                        :
                        <h1> No posts!! </h1>
                    }
                </div>


                <aside className="w-full md:w-1/4">
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