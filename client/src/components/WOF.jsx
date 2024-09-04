import React from 'react';
import '../index.css'

export function WOF() {
    return (
        <div className="bg-[#EBE4D5]">
            <div style={{ backgroundColor: '#D4B990', padding: '90px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center' }}>Wall of Fame</h1>
                <p style={{ fontSize: '18px', textAlign: 'center', color: '#333' }}>
                    Celebrating our top alumni donors and most connected members on the platform.
                </p>
            </div>

            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Top Donors</h2>
                <p className="text-gray-600 mb-10">
                    Our most generous alumni who have made significant contributions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#E6D8C6] rounded-lg shadow-md p-6">
                        <div className="flex justify-center mb-4">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                alt="Profile Picture"
                                className="w-16 h-16 rounded-full"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">John Doe</h3>
                        <p className="text-gray-600 mb-4">$50,000</p>
                        <p className="text-gray-600">
                            John is a successful entrepreneur and philanthropist who has been a long-time supporter of our institution.
                        </p>
                    </div>

                    <div className="bg-[#E6D8C6] rounded-lg shadow-md p-6">
                        <div className="flex justify-center mb-4">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                alt="Profile Picture"
                                className="w-16 h-16 rounded-full"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Jane Smith</h3>
                        <p className="text-gray-600 mb-4">$35,000</p>
                        <p className="text-gray-600">
                            Jane is a renowned scientist and researcher who has made significant contributions to our institution's research programs.
                        </p>
                    </div>

                    <div className="bg-[#E6D8C6] rounded-lg shadow-md p-6">
                        <div className="flex justify-center mb-4">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                alt="Profile Picture"
                                className="w-16 h-16 rounded-full"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Michael Johnson</h3>
                        <p className="text-gray-600 mb-4">$25,000</p>
                        <p className="text-gray-600">
                            Michael is a successful business leader and philanthropist who has been a long-time supporter of our institution.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-stone-800 mb-2">Most Connected Alumni</h2>
                <p className="text-stone-600 mb-6">
                    Our alumni who have the most connections and are actively engaged with our community.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#E6D8C6] rounded-lg shadow-md p-6">
                        <div className="flex justify-center mb-4">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                alt="Profile Picture"
                                className="w-16 h-16 rounded-full"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Sarah Lee</h3>
                        <p className="text-gray-600 mb-4">1,234 connections</p>
                        <p className="text-gray-600">
                            Sarah is a highly engaged alumna who is actively involved in our mentorship program and alumni events.
                        </p>
                    </div>

                    <div className="bg-[#E6D8C6] rounded-lg shadow-md p-6">
                        <div className="flex justify-center mb-4">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                alt="Profile Picture"
                                className="w-16 h-16 rounded-full"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">David Kim</h3>
                        <p className="text-gray-600 mb-4">987 connections</p>
                        <p className="text-gray-600">
                            David is a successful entrepreneur and a prominent member of our alumni network, frequently connecting with other members.
                        </p>
                    </div>

                    <div className="bg-[#E6D8C6] rounded-lg shadow-md p-6">
                        <div className="flex justify-center mb-4">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                alt="Profile Picture"
                                className="w-16 h-16 rounded-full"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Emily Chen</h3>
                        <p className="text-gray-600 mb-4">789 connections</p>
                        <p className="text-gray-600">
                            Emily is a highly influential alumna who is actively involved in our alumni mentorship and networking programs.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

