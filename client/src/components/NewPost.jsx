import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
const backendURL = import.meta.env.VITE_backendURL;

import { Nav } from './Nav'

export function NewPost() {
    const [content, setContent] = useState('');
    const [tag, setTag] = useState('success story');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`${backendURL}/feed/newPost`,
                { content, tag },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('jwt_token')}`
                    }
                }
            );
            const data = response.data;

            if (data.status === 'success') {
                navigate('/feed');
                toast.success('Posted!');
            }
            else {
                console.log('Error fetching posts');
                toast.error(`An error occurred ${data.message}`);
            }
        }
        catch (e) {
            console.log(e.message);
            toast.error(`An error occurred `);
        }
    }

    return (
        <>
            <Nav />

            <div className="min-h-screen bg-[#EBE4D5] flex items-center justify-center font-mono">
                <div className="bg-[#E6D8C6] p-8 rounded-lg shadow-md w-96 border border-beige-300">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Share your thoughts</h2>
                    <p className="text-sm mb-6 text-gray-600">Write something and share it with your friends.</p>

                    <form>
                        <div className="mb-4">
                            <textarea
                                className="w-full p-3 border border-beige-300 rounded bg-beige-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-beige-300"
                                rows="4"
                                placeholder="What's on your mind?"
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm mb-2" htmlFor="tag">
                                Select a tag:
                            </label>
                            <select
                                id="tag"
                                className="w-full p-3 border border-beige-300 rounded bg-beige-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-beige-300"
                                onChange={(e) => setTag(e.target.value)}
                            >
                                <option value="success story">Success Story</option>
                                <option value="achievement">Achievement</option>
                                <option value="article">Article</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#D4B990] text-gray-800 py-2 px-4 rounded hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-beige-300 focus:ring-opacity-50"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Post
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
