import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Nav } from './Nav';
const backendURL = import.meta.env.VITE_backendURL;

export function User() {
    const { userID } = useParams();
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        async function getUser() {
            try {
                const response = await axios.get(`${backendURL}/user/${userType}/${userID}`,
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem('jwt_token')}`
                        }
                    }
                );
                const data = response.data;

                if (data.status === 'success') {
                    setUser(data.user)
                }
                else {
                    console.log('Error getting user');
                    // toast.error(`An error occurred ${data.message}`);
                }
            }
            catch (e) {
                console.log(e.message);
                // toast.error(`An error occurred `);
            }
        }

        getUser();
    }, [])

    return (
        <>
            <Nav />

            <button onClick={() => {
                sessionStorage.clear('jwt_token');
                navigate('/');
                toast.success('Logged out');
            }}>
                Logout
            </button>

            <div className="bg-beige-100 h-screen w-full flex">
                {/* Single Card */}
                <div className="bg-beige-50 shadow-lg rounded-lg p-6 flex flex-col lg:flex-row w-full space-y-6 lg:space-y-0 lg:space-x-6">
                    {/* Left Side */}
                    <div className="flex-1">
                        <div className="flex items-center space-x-4">
                            <div
                                style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s)' }}
                                className="h-16 w-16 bg-cover bg-center rounded-full"
                                alt="Profile"
                            ></div>
                            <div>
                                <div className='flexbox items-center space-x'>
                                    <h1 className="text-2xl font-semibold"> John Doe </h1>
                                    <div className="flex items-center space-x-2">
                                        <div
                                            style={{ backgroundImage: 'url(https://t4.ftcdn.net/jpg/01/65/68/43/360_F_165684384_HYV86h5bmrPtFtKozF2wzrcKOJgiITbQ.jpg)' }}
                                            className="h-8 w-8 bg-cover bg-center rounded-full"
                                            alt="Profile"
                                        ></div>
                                        <p className="text-beige-700">Acme University, Class of 2015</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between mt-4">
                            <div className="text-xl font-bold text-beige-700">$5,000 Donations</div>
                            <div className="text-xl font-bold text-beige-700">12 Posts</div>
                            <div className="text-xl font-bold text-beige-700">120 Followers</div>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-lg font-semibold">Achievements</h2>
                            <div className="flex flex-wrap space-x-2 mt-2">
                                <span className="bg-beige-200 text-beige-800 text-sm px-2 py-1 rounded-full">Valedictorian</span>
                                <span className="bg-beige-200 text-beige-800 text-sm px-2 py-1 rounded-full">Dean's List</span>
                                <span className="bg-beige-200 text-beige-800 text-sm px-2 py-1 rounded-full">Student Government</span>
                                <span className="bg-beige-200 text-beige-800 text-sm px-2 py-1 rounded-full">Volunteer of the Year</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-lg font-semibold">Activity</h2>
                            <div className="bg-beige-200 p-4 mt-4 rounded-2xl">

                                <h3 className="font-semibold text-beige-800">Job Posted</h3>
                                <div className="border-t-4 border-beige-800 mb-2"></div> {/* Dark line */}
                                <h3 className="font-semibold">Senior Software Engineer</h3>
                                <p className="text-sm text-beige-800">Acme Inc. - Remote</p>
                                <p className="text-sm text-beige-700 mt-2">We are looking for an experienced software engineer to join our team and help us build innovative products.</p>
                                <p className="text-right text-xs text-beige-600 mt-2">2 days ago</p>
                            </div>
                            <div className="bg-beige-200 p-4 mt-4 rounded-2xl">
                                <h3 className="font-semibold text-beige-800">Post</h3>
                                <div className="border-t-4 border-beige-800 mb-2"></div>
                                <h3 className="font-semibold">Reflecting on my time at Acme University</h3>
                                <p className="text-sm text-beige-800">John Doe</p>
                                <p className="text-sm text-beige-700 mt-2">As I look back on my time at Acme University, I'm filled with a deep sense of...</p>
                                <p className="text-right text-xs text-beige-600 mt-2">1 week ago</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex-[0.3] p-6 bg-beige-50">
                        <div>
                            <h2 className="text-lg font-semibold">About</h2>
                            <p className="text-sm text-beige-700 mt-2">
                                John Doe is a proud alumnus of Acme University, where he graduated in 2015 with a degree in Computer Science. During his time at the university, John was an active member of the student community, serving as the president of the Computer Science Club and volunteering regularly at the local community center. Since graduating, John has gone on to have a successful career in the tech industry, working as a Senior Software Engineer at Acme Inc. He has also remained engaged with his alma mater, donating $5,000 to the university’s scholarship fund and serving on the alumni advisory board.
                            </p>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-lg font-semibold">Following</h2>
                            <div className="flex flex-col space-y-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <div
                                        style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s)' }}
                                        className="h-8 w-8 bg-cover bg-center rounded-full"
                                        alt="Profile"
                                    ></div>
                                    <div className="font-times">
                                        Acme University<br />
                                        <div className='font-Arial'>@acme_university</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div
                                        style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s)' }}
                                        className="h-8 w-8 bg-cover bg-center rounded-full"
                                        alt="Profile"
                                    ></div>
                                    <div className="font-times">
                                        Alex Smith<br />
                                        <div className='font-Arial'>@alex_smith</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div
                                        style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF5-3YjBcXTqKUlOAeUUtuOLKgQSma2wGG1g&s)' }}
                                        className="h-8 w-8 bg-cover bg-center rounded-full"
                                        alt="Profile"
                                    ></div>
                                    <div className="font-times">
                                        Jane Doe<br />
                                        <div className='font-Arial'>@jane_doe</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
