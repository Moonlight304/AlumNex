import { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="bg-[#e6d8c6] border-b border-[#d4b990]">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="text-2xl">🎓</div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-3">
                            <Link to={'/'} className="text-gray-700 px-3 py-2 rounded-md text-sm">
                                Home
                            </Link>

                            <Link to={'/alumni'} className="text-gray-700 px-3 py-2 rounded-md text-sm">
                                Alumni
                            </Link>

                            <Link to={'/events'} className="text-gray-700 px-3 py-2 rounded-md text-sm">
                                Events
                            </Link>

                            <Link to={'/contact'} className="text-gray-700 px-3 py-2 rounded-md text-sm">
                                Contact
                            </Link>

                            <Link to={'/login'} className="text-gray-700 px-3 py-2 rounded-md text-sm">
                                Login
                            </Link>

                            <Link to={'/signup'} className="text-gray-700 px-3 py-2 rounded-md text-sm">
                                Sign up
                            </Link>

                        </div>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            id="mobile-menu-button"
                            aria-label="Open mobile menu"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            {isMobileMenuOpen ? '✖' : '☰'}
                        </button>
                    </div>
                </div>
            </div>

            <div id="mobile-menu" className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link to={'/'} className="text-gray-700 block px-3 py-2 rounded-md text-base">
                        Home
                    </Link>
                    <Link to={'/alumni'} className="text-gray-700 block px-3 py-2 rounded-md text-base">
                        Alumni
                    </Link>
                    <Link to={'/events'} className="text-gray-700 block px-3 py-2 rounded-md text-base">
                        Events
                    </Link>
                    <Link to={'/contact'} className="text-gray-700 block px-3 py-2 rounded-md text-base">
                        Contact
                    </Link>
                    <Link to={'/login'} className="text-gray-700 block px-3 py-2 rounded-md text-base">
                        Login
                    </Link>
                    <Link to={'/signup'} className="text-gray-700 block px-3 py-2 rounded-md text-base">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
}