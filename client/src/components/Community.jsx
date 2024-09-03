import React, { useState } from 'react';
import { Nav } from './Nav';

export function Community() {
    const [selectedChat, setSelectedChat] = useState(null);

    const openChat = (chatId, communityId) => {
        setSelectedChat(chatId);

        // Highlight the selected community
        document.querySelectorAll('#community-list li').forEach(li => {
            li.classList.remove('bg-[#d6c4a7]');
        });
        document.getElementById(communityId).classList.add('bg-[#d6c4a7]');
    };

    return (
        <>

            <Nav />

            <div className="flex h-screen bg-[#e5dec4]">
                {/* Sidebar */}
                <div className="w-1/4 bg-[#e5dec4] p-4">
                    <h2 className="text-lg font-semibold mb-4">Communities</h2>
                    <ul id="community-list" className="space-y-2">
                        <li
                            id="cs"
                            className={`cursor-pointer flex items-center space-x-2 p-2 rounded ${selectedChat === 'cs-chat' ? 'bg-[#d6c4a7]' : ''}`}
                            onClick={() => openChat('cs-chat', 'cs')}
                        >
                            <span>👥</span>
                            <span>Computer Science</span>
                        </li>
                        <li
                            id="ba"
                            className={`cursor-pointer flex items-center space-x-2 p-2 rounded ${selectedChat === 'ba-chat' ? 'bg-[#d6c4a7]' : ''}`}
                            onClick={() => openChat('ba-chat', 'ba')}
                        >
                            <span>👥</span>
                            <span>Business Administration</span>
                        </li>
                        <li
                            id="eng"
                            className={`cursor-pointer flex items-center space-x-2 p-2 rounded ${selectedChat === 'eng-chat' ? 'bg-[#d6c4a7]' : ''}`}
                            onClick={() => openChat('eng-chat', 'eng')}
                        >
                            <span>👥</span>
                            <span>Engineering</span>
                        </li>
                        <li
                            id="hum"
                            className={`cursor-pointer flex items-center space-x-2 p-2 rounded ${selectedChat === 'hum-chat' ? 'bg-[#d6c4a7]' : ''}`}
                            onClick={() => openChat('hum-chat', 'hum')}
                        >
                            <span>👥</span>
                            <span>Humanities</span>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex bg-[#e5dec4] p-4">
                    {/* Chat Section */}
                    <div className="flex-1 bg-[#e5dec4] p-4 relative">
                        {selectedChat === null && (
                            <div id="select-community" className="absolute inset-0 flex items-center justify-center text-lg text-gray-600">
                                Select a community.
                            </div>
                        )}

                        {/* Computer Science Chat */}
                        {selectedChat === 'cs-chat' && (
                            <div id="cs-chat" className="flex flex-col justify-between h-full">
                                <div className="overflow-y-auto">
                                    <div className="bg-[#6d553a] p-4 rounded-lg mb-4">
                                        <div className="flex items-start space-x-2 mb-2">
                                            <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full" />
                                            <div className="bg-[#b5a489] p-2 rounded">
                                                <p>Hey everyone, I just wanted to share this great article I found on the latest alumni career trends.</p>
                                                <div className="flex space-x-2 text-sm mt-2">
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Career</span>
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Resources</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2 mb-2">
                                            <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full" />
                                            <div className="bg-[#b5a489] p-2 rounded">
                                                <p>Thanks for sharing! I'll definitely check that out. In the meantime, here's a link to a webinar on negotiating salaries.</p>
                                                <div className="flex space-x-2 text-sm mt-2">
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Career</span>
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Resources</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2 mb-2">
                                            <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full" />
                                            <div className="bg-[#b5a489] p-2 rounded">
                                                <p>Hey, has anyone been to the alumni networking event next month? I'd love to connect with more of you in person.</p>
                                                <div className="flex space-x-2 text-sm mt-2">
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Events</span>
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Networking</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#6d553a] p-4 rounded-lg flex items-center space-x-2">
                                    <input type="text" className="w-full p-2 rounded bg-[#e5dec4] border-none" placeholder="Type your message..." />
                                    <button className="bg-[#6d553a] text-white p-2 rounded">Send</button>
                                </div>
                            </div>
                        )}

                        {/* Business Administration Chat */}
                        {selectedChat === 'ba-chat' && (
                            <div id="ba-chat" className="flex flex-col justify-between h-full">
                                <div className="overflow-y-auto">
                                    <div className="bg-[#6d553a] p-4 rounded-lg mb-4">
                                        <div className="flex items-start space-x-2 mb-2">
                                            <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full" />
                                            <div className="bg-[#b5a489] p-2 rounded">
                                                <p>I'm looking for some advice on how to handle business negotiations. Any tips?</p>
                                                <div className="flex space-x-2 text-sm mt-2">
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Business</span>
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Negotiations</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2 mb-2">
                                            <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full" />
                                            <div className="bg-[#b5a489] p-2 rounded">
                                                <p>I recommend starting with a clear understanding of both parties' needs. Here's a great book on the topic.</p>
                                                <div className="flex space-x-2 text-sm mt-2">
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Resources</span>
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Books</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2 mb-2">
                                            <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full" />
                                            <div className="bg-[#b5a489] p-2 rounded">
                                                <p>Has anyone attended the latest workshop on digital marketing? I'd love to hear your thoughts.</p>
                                                <div className="flex space-x-2 text-sm mt-2">
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Workshops</span>
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Marketing</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#6d553a] p-4 rounded-lg flex items-center space-x-2">
                                    <input type="text" className="w-full p-2 rounded bg-[#e5dec4] border-none" placeholder="Type your message..." />
                                    <button className="bg-[#6d553a] text-white p-2 rounded">Send</button>
                                </div>
                            </div>
                        )}

                        {/* Engineering Chat */}
                        {selectedChat === 'eng-chat' && (
                            <div id="eng-chat" className="flex flex-col justify-between h-full">
                                <div className="overflow-y-auto">
                                    <div className="bg-[#6d553a] p-4 rounded-lg mb-4">
                                        <div className="flex items-start space-x-2 mb-2">
                                            <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full" />
                                            <div className="bg-[#b5a489] p-2 rounded">
                                                <p>Can anyone recommend good resources for learning about new technologies in engineering?</p>
                                                <div className="flex space-x-2 text-sm mt-2">
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Tech</span>
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Engineering</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2 mb-2">
                                            <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full" />
                                            <div className="bg-[#b5a489] p-2 rounded">
                                                <p>Check out this new online course on the latest advancements in engineering. I found it very insightful!</p>
                                                <div className="flex space-x-2 text-sm mt-2">
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Courses</span>
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Tech</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2 mb-2">
                                            <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full" />
                                            <div className="bg-[#b5a489] p-2 rounded">
                                                <p>Does anyone have experience with the new engineering software that's just been released?</p>
                                                <div className="flex space-x-2 text-sm mt-2">
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Software</span>
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Engineering</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#6d553a] p-4 rounded-lg flex items-center space-x-2">
                                    <input type="text" className="w-full p-2 rounded bg-[#e5dec4] border-none" placeholder="Type your message..." />
                                    <button className="bg-[#6d553a] text-white p-2 rounded">Send</button>
                                </div>
                            </div>
                        )}

                        {/* Humanities Chat */}
                        {selectedChat === 'hum-chat' && (
                            <div id="hum-chat" className="flex flex-col justify-between h-full">
                                <div className="overflow-y-auto">
                                    <div className="bg-[#6d553a] p-4 rounded-lg mb-4">
                                        <div className="flex items-start space-x-2 mb-2">
                                            <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full" />
                                            <div className="bg-[#b5a489] p-2 rounded">
                                                <p>Has anyone read the latest book on contemporary philosophy? Looking for recommendations.</p>
                                                <div className="flex space-x-2 text-sm mt-2">
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Books</span>
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Philosophy</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2 mb-2">
                                            <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full" />
                                            <div className="bg-[#b5a489] p-2 rounded">
                                                <p>I highly recommend "Philosophy 101". It's a great introduction to contemporary ideas.</p>
                                                <div className="flex space-x-2 text-sm mt-2">
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Books</span>
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Recommendations</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-2 mb-2">
                                            <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full" />
                                            <div className="bg-[#b5a489] p-2 rounded">
                                                <p>Looking forward to the upcoming conference on modern literature. Anyone else attending?</p>
                                                <div className="flex space-x-2 text-sm mt-2">
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Conferences</span>
                                                    <span className="bg-[#d6c4a7] px-2 py-1 rounded">Literature</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#6d553a] p-4 rounded-lg flex items-center space-x-2">
                                    <input type="text" className="w-full p-2 rounded bg-[#e5dec4] border-none" placeholder="Type your message..." />
                                    <button className="bg-[#6d553a] text-white p-2 rounded">Send</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

