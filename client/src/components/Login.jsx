import axios from 'axios'
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Navbar } from './Navbar';

const backendURL = import.meta.env.VITE_backendURL;

export function Login() {
    const [userType, setUserType] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await axios.post(`${backendURL}/auth/login`,
                { userType: userType, username: username, password: password },
            );
            const data = response.data;

            if (data.status === 'success') {
                console.log('Login successful');
                sessionStorage.setItem('jwt_token', data.jwt_token);
                toast.success('Login successful!');
                navigate('/feed');
            }
            else {
                console.log('Error Logging in');
                toast.error(`${data.message}`);
            }
        }
        catch (e) {
            console.log(e.message);
            toast.error(`An error occurred `);
        }

    }

    return (
        <>
            <Navbar />

            <div className="bg-[#ebe4d5] font-sans min-h-screen flex items-center justify-center">
                <div className="bg-[#e5d4be] p-12 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-2xl mb-4 md:text-4xl font-semibold text-[#483312]">
                        Login
                    </h2>
                    <p className="text-gray-600 mb-12">
                        Sign in to your account to connect with alumni and students.
                    </p>

                    <form>
                        <div className="mb-4">
                            <label
                                htmlFor="userType"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                User Type
                            </label>
                            <select
                                id="userType"
                                className="w-full p-2 bg-[#ebe4d5] border border-custom-brown rounded bg-custom-beige text-gray-700"
                                onChange={(e) => setUserType(e.target.value)}
                                value={userType}
                                required
                            >
                                <option value="">Select User Type</option>
                                <option value="Student">Student</option>
                                <option value="Alumni">Alumni</option>
                                <option value="Admin">Admin</option>
                            </select>

                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                autoComplete="on"
                                className="w-full p-2 bg-[#ebe4d5] border border-custom-brown rounded bg-custom-beige text-gray-700"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="w-full mb-4 p-2 bg-[#ebe4d5] border border-custom-brown rounded bg-custom-beige text-gray-700"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#cc9747] hover:bg-[#d4b992] text-white py-2 rounded hover:bg-custom-tan transition duration-300"
                            onClick={(e) => handleLogin(e)}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>

        </>
    );
}