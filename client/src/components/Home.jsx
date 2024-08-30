export function Home() {

    return (
        <div className="bg-[#e6d8c6] font-mono font-medium">

            <div className="flex flex-col items-center justify-center min-h-screen px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl text-[#4a3f35] mb-6 text-center font-sans font-medium">
                    Connect with Alumni
                </h1>
                <p className="text-[#4a3f35] text-center mb-8 text-sm sm:text-base">
                    Discover new opportunities, network, and stay connected<br className="hidden sm:inline" />
                    with your fellow alumni.
                </p>
                <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
                    <button className="px-8 py-3 bg-[#f5edde] text-[#4a3f35] rounded border border-[#e6dfd1] text-sm hover:border-[#d4b990]">
                        Join Now
                    </button>
                    <button className="px-8 py-3 bg-[#f5edde] text-[#4a3f35] rounded border border-[#e6dfd1] text-sm hover:border-[#d4b990]">
                        Learn More
                    </button>
                </div>
            </div>
            <div className="bg-[#E6D8C6] p-8 mb-16 mx-auto font-mono font-normal">
                <h1 className="text-4xl font-sans font-bold text-center mb-4">
                    Featured Alumni
                </h1>
                <p className="text-center mb-8">
                    Get inspired by the stories and achievements of our accomplished alumni.
                </p>
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-[#E6D8C6] rounded-lg shadow-md p-6 border border-[#4a3f35]">
                            <div className="h-48 bg-gray-100 mb-4 rounded"></div>
                            <h2 className="text-xl font-bold mb-2">John Doe</h2>
                            <p className="text-gray-600 mb-2">
                                Software Engineer, Google<br />Class of 2016
                            </p>
                            <p className="mb-4 text-sm">
                                John is a software engineer at Google, where he specializes in
                                building scalable web applications.
                            </p>
                        </div>

                        <div className="bg-[#E6D8C6] rounded-lg shadow-md p-6 border border-[#4a3f35]">
                            <div className="h-48 bg-gray-100 mb-4 rounded"></div>
                            <h2 className="text-xl font-bold mb-2">Jane Smith</h2>
                            <p className="text-gray-600 mb-2">
                                Entrepreneur, Founder of Acme Inc.<br />Class of 2010
                            </p>
                            <p className="mb-4 text-sm">
                                Jane is the founder of Acme Inc., a successful technology
                                startup. She is passionate about mentoring young entrepreneurs.
                            </p>
                        </div>

                        <div className="bg-[#E6D8C6] rounded-lg shadow-md p-6 border border-[#4a3f35]">
                            <div className="h-48 bg-gray-100 mb-4 rounded"></div>
                            <h2 className="text-xl font-bold mb-2">Michael Johnson</h2>
                            <p className="text-gray-600 mb-2">
                                Data Scientist, Acme Analytics<br />Class of 2018
                            </p>
                            <p className="mb-4 text-sm">
                                Michael is a data scientist at Acme Analytics, where he helps
                                companies make data-driven decisions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#E6D8C6] p-8 mx-auto font-mono font-normal">
                <h1 className="text-4xl font-sans font-bold text-center mb-4">
                    Upcoming Events
                </h1>
                <p className="text-center mb-8">
                    Stay up-to-date with the latest alumni events and networking
                    opportunities.
                </p>
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-[#E6D8C6] rounded-lg shadow-md p-6 border border-[#4a3f35]">
                            <div className="h-48 bg-gray-100 mb-4 rounded"></div>
                            <h2 className="text-xl font-bold mb-2">Alumni Networking Event</h2>
                            <p className="text-gray-600 mb-2">June 15, 2023 | 6:00 PM - 9:00 PM</p>
                            <p className="mb-4 text-sm">
                                Join us for an evening of networking and reconnecting with fellow
                                alumni. Enjoy drinks, hors d'oeuvres, and engaging conversations.
                            </p>
                            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-[#D4B990] text-sm">
                                RSVP
                            </button>
                        </div>

                        <div className="bg-[#E6D8C6] rounded-lg shadow-md p-6 border border-[#4a3f35]">
                            <div className="h-48 bg-gray-100 mb-4 rounded"></div>
                            <h2 className="text-xl font-bold mb-2">Career Development Workshop</h2>
                            <p className="text-gray-600 mb-2">July 20, 2023 | 9:00 AM - 12:00 PM</p>
                            <p className="mb-4 text-sm">
                                Explore new career paths and learn valuable skills from industry
                                experts. This interactive workshop is open to all alumni.
                            </p>
                            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-[#D4B990] text-sm">
                                Register
                            </button>
                        </div>

                        <div className="bg-[#E6D8C6] rounded-lg shadow-md p-6 border border-[#4a3f35]">
                            <div className="h-48 bg-gray-100 mb-4 rounded"></div>
                            <h2 className="text-xl font-bold mb-2">Alumni Reunion</h2>
                            <p className="text-gray-600 mb-2">August 10, 2023 | 12:00 PM - 5:00 PM</p>
                            <p className="mb-4 text-sm">
                                Reconnect with old friends and make new ones at our annual alumni
                                reunion. Family and friends are welcome to join in the fun.
                            </p>
                            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-[#D4B990] text-sm">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
