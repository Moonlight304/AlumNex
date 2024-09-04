import { useState } from "react";

export function SearchFilters() {
    const [filter, setFilter] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div className="container mx-auto px-4 py-8 bg-beige-200">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Search & Filter</h2>
                    <p className="text-gray-600">
                        Find specific alumni by name, donation amount, or connection count.
                    </p>
                </div>
                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    {/* Filter Button */}
                    <div className="relative inline-block text-left">
                        <div>
                            <button
                                type="button"
                                onClick={() => setFilter(!filter)}
                                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Filter
                                <svg
                                    className="-mr-1 ml-2 h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06-.02L10 10.875l3.71-3.67a.75.75 0 111.05 1.07l-4.25 4.21a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01-.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Dropdown menu */}
                        {filter && (
                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                <div className="py-1">
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                                    >
                                        Top Donors
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Most Connected
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Donation Amount
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Connection Count
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search alumni..."
                        className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>
        </div>
    );
}
