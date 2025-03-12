import { useState } from 'react'; // Import useState
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import { FaUserGraduate, FaChalkboardTeacher, FaUserCog, FaStar, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'; // Import icons
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'; // Social media icons
import LoginModal from '../components/auth/LoginModal';


export default function HomePage() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State for modal visibility

    return (
        <div className="flex flex-col min-h-screen font-sans">
            {/* Header */}
            <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
                {/* Logo and Site Name */}
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold">Quiz Management System</h1>
                </div>

                {/* Navigation Menu */}
                <nav className="hidden md:flex space-x-6">
                    <Link to="/" className="text-white hover:text-blue-500 transition duration-300">
                        Home
                    </Link>
                    <Link to="/about" className="text-white hover:text-blue-500 transition duration-300">
                        About
                    </Link>
                    <Link to="/features" className="text-white hover:text-blue-500 transition duration-300">
                        Features
                    </Link>
                    <Link to="/contact" className="text-white hover:text-blue-500 transition duration-300">
                        Contact
                    </Link>
                </nav>

                {/* Login Button */}
                <button
                    onClick={() => setIsLoginModalOpen(true)} // Open modal on click
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
                >
                    Login
                </button>

                {/* Mobile Menu Button (Hamburger Icon) */}
                <button className="md:hidden text-white focus:outline-none">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                {/* Carousel Section */}
                <section className="h-max w-full">
                    <Carousel
                        autoPlay
                        infiniteLoop
                        showThumbs={false}
                        showStatus={false}
                        interval={5000}
                        className="carousel">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Slide 1"
                                className="h-96 object-cover"
                            />
                            <p className="legend text-xl font-bold bg-black bg-opacity-50 p-4 rounded">
                                Take Quizzes and Track Your Progress
                            </p>
                        </div>
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Slide 2"
                                className="h-96 object-cover"
                            />
                            <p className="legend text-xl font-bold bg-black bg-opacity-50 p-4 rounded">
                                Create and Manage Quizzes Effortlessly
                            </p>
                        </div>
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Slide 3"
                                className="h-96 object-cover"
                            />
                            <p className="legend text-xl font-bold bg-black bg-opacity-50 p-4 rounded">
                                Analyze Performance and Improve Learning
                            </p>
                        </div>
                    </Carousel>
                </section>

                {/* Welcome Section */}
                <section className="text-center py-16 bg-gradient-to-r from-blue-50 to-blue-100">
                    <h2 className="text-4xl font-bold text-gray-800">Welcome to the Quiz Management System</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        A comprehensive platform for students, teachers, and admins to manage quizzes, track progress, and enhance learning outcomes.
                    </p>
                    <Link
                        to="/register"
                        className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg"
                    >
                        Get Started
                    </Link>
                </section>

                {/* Features Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 bg-white shadow-lg rounded-lg text-center hover:shadow-xl transition-shadow duration-300">
                                <FaUserGraduate className="text-6xl text-blue-600 mx-auto" />
                                <h3 className="text-xl font-semibold text-gray-800 mt-4">For Students</h3>
                                <p className="text-gray-600 mt-2">
                                    Attempt quizzes, view scores, and track your progress easily.
                                </p>
                            </div>
                            <div className="p-8 bg-white shadow-lg rounded-lg text-center hover:shadow-xl transition-shadow duration-300">
                                <FaChalkboardTeacher className="text-6xl text-blue-600 mx-auto" />
                                <h3 className="text-xl font-semibold text-gray-800 mt-4">For Teachers</h3>
                                <p className="text-gray-600 mt-2">
                                    Create quizzes, manage students, and analyze performance.
                                </p>
                            </div>
                            <div className="p-8 bg-white shadow-lg rounded-lg text-center hover:shadow-xl transition-shadow duration-300">
                                <FaUserCog className="text-6xl text-blue-600 mx-auto" />
                                <h3 className="text-xl font-semibold text-gray-800 mt-4">For Admins</h3>
                                <p className="text-gray-600 mt-2">
                                    Manage users, schedules, and monitor overall system analytics.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Users Say</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-8 bg-white shadow-lg rounded-lg">
                                <div className="flex items-center mb-4">
                                    <FaQuoteLeft className="text-2xl text-blue-600 mr-2" />
                                    <p className="text-gray-600 italic">
                                        This platform has transformed the way I manage quizzes and track student progress. Highly recommended!
                                    </p>
                                    <FaQuoteRight className="text-2xl text-blue-600 ml-2" />
                                </div>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                        A
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-semibold text-gray-800">Alice Johnson</h4>
                                        <p className="text-gray-600">Teacher</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 bg-white shadow-lg rounded-lg">
                                <div className="flex items-center mb-4">
                                    <FaQuoteLeft className="text-2xl text-blue-600 mr-2" />
                                    <p className="text-gray-600 italic">
                                        The analytics dashboard is a game-changer. It helps me identify areas where students need more focus.
                                    </p>
                                    <FaQuoteRight className="text-2xl text-blue-600 ml-2" />
                                </div>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                        J
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-semibold text-gray-800">John Smith</h4>
                                        <p className="text-gray-600">Admin</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Quiz Management System</h3>
                                <p className="text-gray-400">
                                    A platform designed to enhance learning and teaching experiences through quizzes and analytics.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                                <ul className="text-gray-400">
                                    <li className="mb-2">
                                        <Link to="/" className="hover:text-blue-500 transition duration-300">
                                            Home
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to="/about" className="hover:text-blue-500 transition duration-300">
                                            About Us
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to="/contact" className="hover:text-blue-500 transition duration-300">
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                                        <FaFacebook className="text-2xl" />
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                                        <FaTwitter className="text-2xl" />
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                                        <FaLinkedin className="text-2xl" />
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300">
                                        <FaInstagram className="text-2xl" />
                                    </a>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                                <p className="text-gray-400">Email: support@quizsystem.com</p>
                                <p className="text-gray-400">Phone: +1 (123) 456-7890</p>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                            <p className="text-gray-400">
                                &copy; {new Date().getFullYear()} Quiz Management System. All Rights Reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </main>

            {/* Login Modal */}
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </div>
    );
}