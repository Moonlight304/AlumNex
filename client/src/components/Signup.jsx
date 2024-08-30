import { useState } from "react";

export function Signup() {
    const [studentUser, setStudentUser] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [branch, setBranch] = useState('');
    const [gradYear, setGradYear] = useState('');
    const [openToMentor, setOpenToMentor] = useState(false);
    const [mentorPitch, setMentorPitch] = useState('');

    return (
        <div className="min-h-screen bg-[#EBE4D5] flex items-center justify-center">
            <div className="bg-[#E6D8C6] p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Register</h2>
                <p className="text-sm mb-6">Join our platform to connect with alumni and students.</p>

                <form>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="userType" className="block text-sm font-medium mb-1">User Type</label>
                            <select
                                id="userType"
                                className="w-full p-2 border rounded bg-white"
                                onChange={(e) => setStudentUser(e.target.value === "Student")}
                            >
                                <option value="Student">Student</option>
                                <option value="Alumni">Alumni</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="w-full p-2 border rounded"
                                placeholder="Enter a username"
                                autoComplete="on"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="w-full p-2 border rounded"
                                placeholder="Enter a password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="w-full p-2 border rounded"
                                placeholder="Confirm your password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2 border rounded"
                            placeholder="Enter your email"
                            autoComplete="on"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {studentUser ? 
                        (
                            <div id="branchField" className="mb-4">
                                <label htmlFor="branch" className="block text-sm font-medium mb-1">Branch/Department</label>
                                <input
                                    type="text"
                                    id="branch"
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter your branch/dept"
                                    autoComplete="on"
                                    onChange={(e) => setBranch(e.target.value)}
                                />
                            </div>
                        ) : (
                            <>
                                <div id="graduationYearField" className="mb-4">
                                    <label htmlFor="graduationYear" className="block text-sm font-medium mb-1">Graduation Year</label>
                                    <input
                                        type="text"
                                        id="graduationYear"
                                        className="w-full p-2 border rounded"
                                        placeholder="Enter your graduation year"
                                        autoComplete="on"
                                        onChange={(e) => setGradYear(e.target.value)}
                                    />
                                </div>

                                <div id="mentoringCheckboxContainer" className="mb-4">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="openToMentoring"
                                            className="mr-2"
                                            autoComplete="on"
                                            onChange={() => setOpenToMentor(!openToMentor)}
                                        />
                                        <span className="text-sm">Open to Mentoring</span>
                                    </label>
                                </div>

                                <div id="mentorPitchField" className="mb-4">
                                    <label htmlFor="mentorPitch" className="block text-sm font-medium mb-1">Mentor Pitch</label>
                                    <textarea
                                        id="mentorPitch"
                                        className="w-full p-2 border rounded"
                                        rows="3"
                                        placeholder="Tell us about your mentoring experience"
                                        onChange={(e) => setMentorPitch(e.target.value)}
                                    ></textarea>
                                </div>
                                
                            </>
                        )
                    }

                    <button type="submit" className="w-full bg-[#D4B990] text-white py-2 px-4 rounded hover:bg-opacity-90">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
